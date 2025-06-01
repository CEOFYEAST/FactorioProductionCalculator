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

module.exports = { StatusOnlyResponseSchema, BackendSlotSchema, FrontendSlotSchema }