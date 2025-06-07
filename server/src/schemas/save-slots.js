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
    required: ['statusMessage', 'data'],
    properties: {
        statusMessage: { type: 'string' },
        data: { 
            type: 'object',
            additionalProperties: true
        }
    }
}

const SlotsUpdate_SuccessResponseSchema = {
    description: 'a success response',
    required: ['statusMessage'],
    properties: {
        statusMessage: { type: 'string' }
    }
}

module.exports = {SlotsFetchRequestSchema, SlotsUpdateRequestSchema, SlotsFetch_SuccessResponseSchema, SlotsUpdate_SuccessResponseSchema}