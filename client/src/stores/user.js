import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ signedIn: false, userData: undefined }),
    actions: {
        toggleSignedIn() {
            this.signedIn = !(this.signedIn)
        },
        addUserData(newData) {
            if(typeof(newData) == "object") this.userData = newData;
            
        },
        removeUserData() {
            this.userData = undefined
        }
    }
})