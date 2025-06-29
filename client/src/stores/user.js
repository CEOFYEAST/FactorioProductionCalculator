import { defineStore } from 'pinia'
import { sendCreationRequest, sendLoginRequest, sendLogoutRequest } from '@/scripts/accountsAPI'
import { handleSlotUpdate, handleSlotFetch } from '@/scripts/saveSlotsAPI'

const defaultSaveSlots = {
    1: {},
    2: {},
    3: {},
}

const LOADING_MESSAGE = "Loading"

export const useUserStore = defineStore('user', {
    state: () => ({ 
        username: "", 
        signedIn: false, 
        creationStatusMessage: "", 
        accessStatusMessage: "", 
        saveSlotsStatusMessage: "", 
        logoutStatusMessage: "",
        saveSlotData: {...defaultSaveSlots}
    }),
    actions: {
        refreshUserStore(){
            this.signedIn = false
            this.creationStatusMessage = ""
            this.accessStatusMessage = ""
            this.saveSlotData = {...defaultSaveSlots}
        },
        saveToSlot(slotID, factoryData){
            this.saveSlotData[slotID] = factoryData
            this.triggerSlotsUpdate()
        },
        loadSlot(slotID, loadFactoryCallback){
            loadFactoryCallback(this.saveSlotData[slotID])
        },
        async tryLogout(){
            this.logoutStatusMessage = LOADING_MESSAGE
            let requestSuccess = false
            
            await sendLogoutRequest().then(({success, statusMessage}) => {
                requestSuccess = success
                if(success)
                {
                    this.refreshUserStore()
                }
                this.logoutStatusMessage = statusMessage
            })

            return requestSuccess
        },
        async tryCreateAccount(username, password){
            this.creationStatusMessage = LOADING_MESSAGE
            let requestSuccess = false

            // Check username length
            if (username.length < 6 || username.length > 32) {
                this.creationStatusMessage = "Username must be between 6 and 32 characters"
                return false
            }

            // Check password length
            if (password.length < 8 || password.length > 32) {
                this.creationStatusMessage = "Password must be between 8 and 32 characters"
                return false
            }
            
            await sendCreationRequest(username, password).then(({success, statusMessage}) => {
                this.creationStatusMessage = statusMessage
                requestSuccess = success
            })

            return requestSuccess
        },
        async tryLogin(username, password){
            this.accessStatusMessage = LOADING_MESSAGE

            await sendLoginRequest(username, password).then(({success, statusMessage, username}) => {
                this.accessStatusMessage = statusMessage
                this.signedIn = success
                this.username = username
            })

            if(this.signedIn) this.fetchSlotsData();

            return this.signedIn
        },
        async triggerSlotsUpdate(){
            this.saveSlotsStatusMessage = "Updating Slots Data"
            let response = await handleSlotUpdate(this.saveSlotData)
            this.saveSlotsStatusMessage = response.statusMessage
        },
        async fetchSlotsData(){
            this.saveSlotsStatusMessage = "Fetching Slots Data"
            let response = await handleSlotFetch()
            if(response.success)
            {
                this.saveSlotData = { ...response.data }
            }
            this.saveSlotsStatusMessage = response.statusMessage
        },
    }
})
 
/**
 * Tests for store implementation:
 * - hook signedIn up to the v-if/v-show of a component (while maintaining reactivity), and set the toggle action to be called at the press of a button
 * 
 * Now:
 * - make a successful sign-in call toggleSignedIn
 * - make a splash screen that prevents additional sign-ins until the current user logs out
 *      - splash screen should have a log-out option of it's own
 * - make toggle effect the user widget in the top right
 * - make pressing the user widget also call toggleSignedIn
 */