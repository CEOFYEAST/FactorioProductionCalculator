import axios from '@/scripts/axios';
import { definedRoutes } from './router';

export async function sendLoginRequest(username, password){
    await axios
    .post(definedRoutes.accountAccessRoute, {
        username: username,
        userPassword: userPassword
    }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    })
    .then(response => {       
        let toReturn = {
            success: false,
            statusMessage: "",
            userData: undefined
        }
        toReturn.statusMessage = response.data.statusMessage

        if(response.status == 200 || response.status == 201) {
            toReturn.success = true
            toReturn.userData = response.data.userData
        }
       
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

        if(response.status == 200 || response.status == 201) toReturn.success = true
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