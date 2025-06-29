const ProdChainObjectSchema = {
    timeUnit: "minute",
    prodChain: {}
}

const DbSlotDocumentSchema = {
    username: '',
    index: 1,
    data: {
        ...ProdChainObjectSchema
    }
}

const FrontendSlotsSchema = {
    1: {},
    2: {},
    3: {}
}

module.exports = {DbSlotDocumentSchema, FrontendSlotsSchema}