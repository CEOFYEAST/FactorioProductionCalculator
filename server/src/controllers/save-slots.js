const handleSlotsFetch = (req, reply) => {
    if(!(req.session.authenticated)){
        // send 401 code + status message response
    }

    // get username from session
    // (maybe) check if user exists
    // fetch save slot data
    // return save slot data
}

const handleSlotsUpdate = (req, reply) => {
    if(!(req.session.authenticated)){
        // send 401 code + status message response
    }

    // get username from session
    // (maybe) check if user exists
    // update save slot data
    // send success response 
}

module.exports = {handleSlotsUpdate, handleSlotsFetch}