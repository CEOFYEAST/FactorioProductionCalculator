const StatusOnlyResponseSchema = {
    type: 'object',
    description: 'generally packaged with a response indicating failure of the requested action',
    required: ['statusMessage'],
    properties: {
        statusMessage: { type: 'string' }
    }
}

module.exports = StatusOnlyResponseSchema