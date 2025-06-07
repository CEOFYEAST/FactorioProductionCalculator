const fetchSaveSlots = require('../scripts/fetchSaveSlots')
const updateSaveSlots = require('../scripts/updateSaveSlots')

let statusResponse = { statusMessage: "Server error" };
let statusAndDataResponse = { statusMessage: "Server error", data: {} };

const handleSlotsFetch = (req, reply) => {
    if(!(req.session.authenticated)){
        let obj = { ...statusResponse };
        obj.statusMessage = "User is not authenticated";
        return reply.code(401).send(obj);
    }
    fetchSaveSlots(req.app, req.session.username).then((slotsData) => {
        let obj = { ...statusAndDataResponse };
        obj.data = { ...slotsData };
        obj.statusMessage = "Save slots data successfully fetched";
        return reply.code(200).send(obj);
    })
}

const handleSlotsUpdate = (req, reply) => {
    if(!(req.session.authenticated)){
        let obj = { ...statusResponse };
        obj.statusMessage = "User is not authenticated";
        return reply.code(401).send(obj);
    }
    updateSaveSlots(req.app, req.session.username, req.body).then(() => {
        let obj = { ...statusResponse };
        obj.statusMessage = "Save slots data successfully updated";
        return reply.code(201).send(obj);
    })
}

module.exports = {handleSlotsUpdate, handleSlotsFetch}