const {handleSlotsUpdate, handleSlotsFetch} = require('../controllers/save-slots')
const {StatusOnlyResponseSchema} = require('../schemas/shared-schemas')

const SlotsFetchRequestSchema = {
    type: 'object',
    required: [],
    properties: {}
}

const SlotsUpdateRequestSchema = {
    type: 'object',
    required: ['1', '2', '3'],
    properties: {
        1: { type: 'object' },
        2: { type: 'object' },
        3: { type: 'object' }
    }
}

const SlotsFetch_SuccessResponseSchema = {
    description: 'a success response including slots data',
    required: ['statusMessage', '1', '2', '3'],
    properties: {
        statusMessage: { type: 'string' },
        1: { type: 'object' },
        2: { type: 'object' },
        3: { type: 'object' }
    }
}

const SlotsUpdate_SuccessResponseSchema = {
    description: 'a success response',
    required: ['statusMessage'],
    properties: {
        statusMessage: { type: 'string' }
    }
}

const fetchSlotsOpts = {
    schema: {
        body: SlotsFetchRequestSchema,
        response: {
            200: SlotsFetch_SuccessResponseSchema,
            400: StatusOnlyResponseSchema,
            401: StatusOnlyResponseSchema,
            403: StatusOnlyResponseSchema
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
    fastify.post('/save-slots/access', fetchSlotsOpts)
    
    // add item
    fastify.post('/save-slots/update', updateSlotsOpts)

    done()
}

module.exports = accountsRoutes