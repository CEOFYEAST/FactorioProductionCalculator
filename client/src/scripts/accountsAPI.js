import axios from '@/scripts/axios';
import { definedRoutes } from './router';

export async function sendLoginRequest(username, password){
    let toReturn = {
        success: false,
        statusMessage: "No message returned",
        username: ""
    }

    await axios
    .post(definedRoutes.accountAccessRoute, {
        username: username,
        userPassword: password
    }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
        },
        withCredentials: true
    })
    .then(response => {       
        toReturn.statusMessage = response.data.statusMessage

        if(response.status == 200 || response.status == 201) {
            toReturn.success = true
            toReturn.username = response.data.username
        }
    })
    .catch(error => {
         if(error != undefined){
            if(Object.hasOwn(error, 'response')) toReturn.statusMessage = error.response.data.statusMessage;
            else toReturn.statusMessage = "Failed to connect to the server"
        }
    })
    .finally(() => {
    })

    return toReturn
}

export async function sendCreationRequest(username, password){
    let toReturn = {
        success: false,
        statusMessage: "No message returned"
    }

    await axios
    .post(definedRoutes.accountCreationRoute, {
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
    })

    return toReturn
}

export async function sendLogoutRequest(){
    let toReturn = {
        success: false,
        statusMessage: "No message returned"
    }

    await axios
    .post(definedRoutes.accountLogoutRoute, {}, {
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
    })

    return toReturn
}