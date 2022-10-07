import { getLogs, getLog, addLog, updateLog, deleteLog } from "../controllers/logs.js";

const NewLog = {
    type: "object",
    properties: {
        id: { type: "integer" },
        logname: { type: "string" },
        password: { type: "string", format: "password" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

const Log = {
    type: "object",
    properties: {
        id: { type: "integer" },
        logname: { type: "string" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

// Options to get all items
const getLogsOpts = {
    schema: {
        descriptions: "list of logs",
        tags: ['log'],
        params: {
            type: 'object',
            properties: {
                role: {
                    type: 'string',
                    description: 'the log role'
                },
                state: {
                    type: 'string',
                    description: 'the log state'
                },
                confirmed: {
                    type: 'boolean',
                    description: 'the log confirmed or not'
                }
            },
        },
        response: {
            200: {
                type: "array",
                items: Log,
            },
        },
    },
    handler: getLogs,
}

const getLogOpts = {
    schema: {
        descriptions: "list of logs",
        tags: ['log'],
        response: {
            200: Log,
        },
    },
    handler: getLog,
}


const postLogOpts = {
    schema: {
        descriptions: "list of logs",
        tags: ['log'],
        body: NewLog,
        response: {
            201: Log,
        },
    },

    handler: addLog,
}

const putLogOpts = {
    schema: {
        descriptions: "list of logs",
        tags: ['log'],
        params: {
            id: { type: 'number' },
        },
        body: NewLog,
        response: {
            201: Log,
        },
    },

    handler: updateLog,
}


const deleteLogOpts = {
    schema: {
        descriptions: "list of logs",
        tags: ['log'],
        params: {
            id: { type: 'number' },
        },
        response: {
            201: {
                properties: {
                    message: { type: 'string' }
                }
            },
        },
    },

    handler: deleteLog,
}

function logRoutes(fastify, options, done) {
    fastify.get("/logs", getLogsOpts)
    fastify.get("/logs/:id", getLogOpts)
    fastify.post("/logs", postLogOpts)
    fastify.put("/logs/:id", putLogOpts)
    fastify.delete("/logs/:id", deleteLogOpts)
    done()
}

export default logRoutes;

