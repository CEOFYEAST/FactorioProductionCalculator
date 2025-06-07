const StatusOnlyResponseSchema = {
    type: 'object',
    description: 'generally packaged with a response indicating failure of the requested action',
    required: ['statusMessage'],
    properties: {
        statusMessage: { type: 'string' }
    }
}

const BackendSlotSchema = {
    username: '',
    index: 1,
    data: {}
}

const FrontendSlotSchema = {
    1: {},
    2: {},
    3: {}
}

const ProdChainObjectSchema = {
    type: 'object',
    required: ['slot1', 'slot2', 'slot3'],
    properties: {
        slot1: { type: 'object' },
        slot2: { type: 'object' },
        slot3: { type: 'object' }
    },
    additionalProperties: false // Only allow these properties
}

module.exports = { StatusOnlyResponseSchema, BackendSlotSchema, FrontendSlotSchema }