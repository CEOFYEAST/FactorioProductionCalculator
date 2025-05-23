import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ signedIn: false, data: undefined }),
    actions: {
        toggleSignedIn() {
            this.signedIn = !(this.signedIn)
        },
        addUserData(newData) {
            if(typeof(newData) == "object") this.data = newData;
            console.log("New Data Keys: " + Object.keys(this.data))
        },
        removeUserData() {
            this.data = undefined
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