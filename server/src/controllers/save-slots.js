const fetchSaveSlots = require('../scripts/fetchSaveSlots')
const updateSaveSlots = require('../scripts/updateSaveSlots')
const decryptToken = require('../scripts/decryptToken')

let statusResponse = { statusMessage: "Server error" };
let statusAndDataResponse = { statusMessage: "Server error", data: {} };

const handleSlotsFetch = (req, reply) => {
    const token = req.headers['authorization'] || req.headers['Authorization'];
    if (!token) {
        let obj = { ...statusResponse };
        obj.statusMessage = "User is not authenticated";
        return reply.code(401).send(obj);
    }
    decryptToken(token).then(decrypted => {
        fetchSaveSlots(req.app, decrypted.username).then((slotsData) => {
            let obj = { ...statusAndDataResponse };
            obj.data = { ...slotsData };
            obj.statusMessage = "Save slots data successfully fetched";
            return reply.code(200).send(obj);
        })
    })
}

const handleSlotsUpdate = (req, reply) => {
    const token = req.headers['authorization'] || req.headers['Authorization'];
    if(!token){
        let obj = { ...statusResponse };
        obj.statusMessage = "User is not authenticated";
        return reply.code(401).send(obj);
    }
    decryptToken(token).then(decrypted => {
        updateSaveSlots(req.app, decrypted.username, req.body).then(() => {
            let obj = { ...statusResponse };
            obj.statusMessage = "Save slots data successfully updated";
            return reply.code(201).send(obj);
        })
    })
}

module.exports = {handleSlotsUpdate, handleSlotsFetch}