'use strict'

const EventEmitter = require('node:events').EventEmitter

class Store extends EventEmitter {
    constructor (storeMap = new Map()) {
        super()
        this.store = storeMap
        EventEmitter.call(this)
    }

    get (sessionId, callback) {
        console.log(`\n Getting Session: ${sessionId} \n`)
        const session = this.store.get(sessionId)
        callback(null, session)
    }

    set (sessionId, session, callback) {
        console.log(`\n Setting Session: ${sessionId} \n`)
        this.store.set(sessionId, session)
        callback()
    }

    destroy (sessionId, callback) {
        console.log(`\n Destroying Session: ${sessionId} \n`)
        this.store.delete(sessionId)
        callback()
    }
}

module.exports = Store
module.exports.default = Store
module.exports.Store = Store
module.exports.MemoryStore = Store