const getUser = (req, reply) => {
    console.log(req.body)
    reply.send(req.body)
}

const addUser = (req, reply) => {
    console.log(req.body)
    reply.code(201).send(JSON.stringify(req.body))
}

module.exports = {
    getUser,
    addUser
}