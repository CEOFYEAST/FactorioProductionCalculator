'use strict'

const EventEmitter = require('node:events').EventEmitter
const querySession = require('./querySession')
const createSession = require('./createSession')

class Store extends EventEmitter {
    constructor (app) {
        super(app)
        console.log(`\n Constructing Session Store w/ App ${app} \n`)
        this.app = app
    }

    get (sessionId, callback) {
        console.log(`\n Getting Session: ${sessionId} w/ App ${this.app} \n`)
        querySession(this.app, sessionId).then((session) => {
            callback(null, session)
        })
    }

    set (sessionId, session, callback) {
        console.log(`\n Setting Session: ${sessionId} w/ App ${this.app} \n`)
        createSession(this.app, sessionId, session).then(() => {
            callback()
        })
    }

    destroy (sessionId, callback) {
        console.log(`\n Destroying Session: ${sessionId} w/ App ${this.app} \n`)
        this.store.delete(sessionId)
        callback()
    }
}

module.exports = Store
module.exports.default = Store
module.exports.Store = Store
module.exports.MemoryStore = Store