import axios from '@/scripts/axios';
import { definedRoutes } from './router';

export async function handleSlotFetch(){
    let toReturn = {
        statusMessage: "",
        success: false,
        data: {}
    }

    await axios
    .post(definedRoutes.saveSlotsFetchRoute, {}, {
        headers: { 
            "Content-Type": "application/json" 
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
        console.log("Responding With: " + toReturn)
    })

    return toReturn;
}