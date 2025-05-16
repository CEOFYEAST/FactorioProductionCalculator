import { defineStore } from 'pinia'
import { sendCreationRequest, sendLoginRequest, handleSlotUpdate } from '@/scripts/userAPI'

export const useUserStore = defineStore('user', {
    state: () => ({ signedIn: false, creationStatusMessage: "", accessStatusMessage: "", saveSlotData: {
        1: {},
        2: {},
        3: {}
    } }),
    actions: {
        refreshUserStore(){
            this.signedIn = false
            this.creationStatusMessage = ""
            this.accessStatusMessage = ""
            this.saveSlotData = {
                1: {},
                2: {},
                3: {},
            }
        },
        tryCreateAccount(username, password){
            sendCreationRequest(username, password).then(({success, statusMessage}) => {
                this.creationStatusMessage = statusMessage
            })
        },
        tryLogin(username, password){
            sendLoginRequest(username, password).then(({success, statusMessage, userData}) => {
                this.accessStatusMessage = statusMessage
                this.signedIn = success
            })            
        },
        logout(){
            this.signedIn = false
            this.refreshUserStore()
        },
        saveToSlot(slotID, factoryData){
            this.saveSlotData[slotID] = factoryData

            handleSlotUpdate(this.saveSlotData)
        },
        loadSlot(slotID, loadFactoryCallback){
            loadFactoryCallback(this.saveSlotData[slotID])
        }
    },
    getters:{
        username(state) {
            if(state.data != undefined) return state.data.username
            else return undefined
        }
    },
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