import { defineStore } from 'pinia'
import { sendCreationRequest, sendLoginRequest } from '@/scripts/accountsAPI'
import { handleSlotUpdate, handleSlotFetch } from '@/scripts/saveSlotsAPI'

const defaultSaveSlots = {
    1: {},
    2: {},
    3: {},
}

export const useUserStore = defineStore('user', {
    state: () => ({ username: "", signedIn: false, creationStatusMessage: "", accessStatusMessage: "", saveSlotData: {...defaultSaveSlots}}),
    actions: {
        refreshUserStore(){
            this.signedIn = false
            this.creationStatusMessage = ""
            this.accessStatusMessage = ""
            this.saveSlotData = {...defaultSaveSlots}
        },
        async tryCreateAccount(username, password){
            this.creationStatusMessage = "Loading"
            let requestSuccess = false
            
            await sendCreationRequest(username, password).then(({success, statusMessage}) => {
                this.creationStatusMessage = statusMessage
                requestSuccess = success
            })

            return requestSuccess
        },
        async tryLogin(username, password){
            this.accessStatusMessage = "Loading"

            await sendLoginRequest(username, password).then(({success, statusMessage, username}) => {
                this.accessStatusMessage = statusMessage
                this.signedIn = success
                console.log("Reply Username: " + username)
                this.username = username
            })

            if(this.signedIn) this.fetchSlotsData();

            return this.signedIn
        },
        logout(){
            this.signedIn = false
            this.refreshUserStore()
        },
        saveToSlot(slotID, factoryData){
            this.saveSlotData[slotID] = factoryData

            handleSlotUpdate(this.saveSlotData)
        },
        async fetchSlotsData(){
            let response = await handleSlotFetch()
            if(response.success) this.saveSlotData = { ...response.data }
            console.log(response.data)
        },
        loadSlot(slotID, loadFactoryCallback){
            loadFactoryCallback(this.saveSlotData[slotID])
        }
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