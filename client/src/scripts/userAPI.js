import axios from '@/scripts/axios';
import { definedRoutes } from './router';

export function sendLoginRequest(username, password){

}

export async function sendCreationRequest(username, password){
    let toReturn = {
        success: false,
        statusMessage: ""
    }

    await axios
    .post(definedRoutes.accountAccessRoute, {
        username: username,
        userPassword: password
    }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    })
    .then(response => {           
        toReturn.statusMessage = response.data.statusMessage

        if(response.status == 200) toReturn.success = true
    })
    .catch(error => {
        if(error != undefined){
            if(Object.hasOwn(error, 'response')) toReturn.statusMessage = error.response.data.statusMessage;
            else toReturn.statusMessage = "Failed to connect to the server"
        }
    })
    .finally(() => {
        console.log("Responding With: " + toReturn)
    })

    return toReturn
}

export function handleSlotUpdate(saveSlotsData){
    
}