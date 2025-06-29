const {handleSlotsUpdate, handleSlotsFetch} = require('../controllers/save-slots')
const {StatusOnlyResponseSchema} = require('../schemas/fastify-shared')
const {
    SlotsFetchRequestSchema, 
    SlotsUpdateRequestSchema, 
    SlotsFetch_SuccessResponseSchema, 
    SlotsUpdate_SuccessResponseSchema
} = require("../schemas/fastify-save-slots")

const fetchSlotsOpts = {
    schema: {
        body: SlotsFetchRequestSchema,
        response: {
            200: SlotsFetch_SuccessResponseSchema,
            401: StatusOnlyResponseSchema,
        }
    },
    handler: handleSlotsFetch
} 

const updateSlotsOpts = {
    schema: {
        body: SlotsUpdateRequestSchema,
        response: {
            200: SlotsUpdate_SuccessResponseSchema,
            201: SlotsUpdate_SuccessResponseSchema,
            400: StatusOnlyResponseSchema,
            401: StatusOnlyResponseSchema,
            403: StatusOnlyResponseSchema
        }
    },
    handler: handleSlotsUpdate
}

function accountsRoutes(fastify, options, done){
    // get all items
    fastify.post('/user/save-slots/access', fetchSlotsOpts)
    
    // add item
    fastify.post('/user/save-slots/update', updateSlotsOpts)

    done()
}

module.exports = accountsRoutes