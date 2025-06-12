import axios from '@/scripts/axios';
import { definedRoutes } from './router';

export async function handleSlotFetch(){
    let toReturn = {
        statusMessage: "No message returned",
        success: false,
        data: {}
    }

    const token = localStorage.getItem('token');

    await axios
    .post(definedRoutes.saveSlotsFetchRoute, {}, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined
        },
        withCredentials: true
    })
    .then(response => {       
        toReturn.statusMessage = response.data.statusMessage

        if(response.status == 200) {
            toReturn.success = true
            toReturn.data = response.data.data
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

    return toReturn;
}

export async function handleSlotUpdate(saveSlotData){
    let toReturn = {
        statusMessage: "No message returned",
        success: false,
    }

    const token = localStorage.getItem('token');

    await axios
    .post(definedRoutes.saveSlotsUpdateRoute, {...saveSlotData}, {
        headers: { 
            "Content-Type": "application/json",
             "Authorization": token ? `Bearer ${token}` : undefined
        },
        withCredentials: true
    })
    .then(response => {       
        toReturn.statusMessage = response.data.statusMessage

        if(response.status == 201) {
            toReturn.success = true
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

    return toReturn;
}