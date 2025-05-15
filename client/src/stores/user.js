import { defineStore } from 'pinia'
import { sendCreationRequest, sendLoginRequest, handleSlotUpdate } from '@/scripts/userAPI'

export const useUserStore = defineStore('user', {
    state: () => ({ signedIn: false, creationStatusMessage: "", accessStatusMessage: "", saveSlotData: {
        1: {},
        2: {},
        3: {}
    } }),
    actions: {
        tryCreateAccount(username, password){
            const {success, statusMessage} = sendCreationRequest(username, password)

            this.creationStatusMessage = statusMessage
        },
        tryLogin(username, password){
            const {success, statusMessage, userData} = sendLoginRequest(username, password)

            this.accessStatusMessage = statusMessage

            if(success) this.signedIn = true
        },
        saveToSlot(slotID, factoryData){
            /**
             * - Update local save slot copy
             * - Pass copy back to DB via API
             * - (Would probably be better to have the backend execute the changes, and then re-populate the front end)
             */
            this.saveSlotData[slotID] = factoryData

            Object.keys(this.saveSlotData).forEach(slot => {
                console.log(`Slot ${slot}:`, JSON.stringify(this.saveSlotData[slot], null, 2));
            });

            handleSlotUpdate(this.saveSlotData)
        },
        loadSlot(slotID, loadFactoryCallback){
            console.log(JSON.stringify(this.saveSlotData[slotID], null, 2))

            loadFactoryCallback(this.saveSlotData[slotID])
        }
        // toggleSignedIn() {
        //     this.signedIn = !(this.signedIn)
        // },
        // addUserData(newData) {
        //     if(typeof(newData) == "object") this.data = newData;
        //     console.log("New Data Keys: " + Object.keys(this.data))
        // },
        // removeUserData() {
        //     this.data = undefined
        // }
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