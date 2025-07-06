'use strict'

const EventEmitter = require('node:events').EventEmitter
const querySession = require('./querySession')
const createSession = require('./createSession')
const destroySession = require('./destroySession')

class Store extends EventEmitter {
    constructor (app) {
        super(app)
        console.log(`\n Constructing Session Store w/ App ${app} \n`)
        this.app = app
    }

    get (sessionId, callback) {
        querySession(this.app, sessionId).then((session) => {
            console.log("\n Calling session grabbed callback \n")
            callback(null, session)
        })
    }

    set (sessionId, session, callback) {
        createSession(this.app, sessionId, session).then(() => {
            console.log("\n Calling session set callback \n")
            callback()
        })
    }

    destroy (sessionId, callback) {
        console.log(`\n Destroying Session: ${sessionId} w/ App ${this.app} \n`)
        destroySession(this.app, sessionId).then((sessionWasDestroyed) => {
            console.log("\n Calling session destroyed callback \n")
            callback(sessionWasDestroyed)
        })
    }
}

module.exports = Store
module.exports.default = Store
module.exports.Store = Store
module.exports.MemoryStore = Store