import axios from '@/scripts/axios';

export function sendLoginRequest(username, password){

}

export function sendCreationRequest(username, password){
    axios
    .post(definedRoutes.accountAccessRoute, {
        username: this.username,
        userPassword: this.userPassword
    }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    })
    .then(response => {           
        this.submissionSuccess = true
        this.$refs.statusMessage.innerHTML = response.data.statusMessage

        if(response.status != 200) return;

        this.userData = response.data.userData
        this.showStatusMessage = false
        this.userStore.toggleSignedIn()
        this.userStore.addUserData(this.userData)
    })
    .catch(error => {
        if(error == undefined) return

        if(Object.hasOwn(error, 'response')) this.$refs.statusMessage.innerHTML = error.response.data.statusMessage;
        else this.$refs.statusMessage.innerHTML = "Failed to connect to the server"
        
        this.submissionSuccess = false
    })
    .finally() 
}

export function handleSlotUpdate(saveSlotsData){
    
}