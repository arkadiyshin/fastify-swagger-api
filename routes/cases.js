import { getCases, getCase, addCase, updateCase, deleteCase } from "../controllers/cases.js";

const NewCase = {
    type: "object",
    properties: {
        id: { type: "integer" },
        casename: { type: "string" },
        password: { type: "string", format: "password" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

const Case = {
    type: "object",
    properties: {
        id: { type: "integer" },
        casename: { type: "string" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

// Options to get all items
const getCasesOpts = {
    schema: {
        descriptions: "list of cases",
        tags: ['case'],
        params: {
            type: 'object',
            properties: {
                role: {
                    type: 'string',
                    description: 'the case role'
                },
                state: {
                    type: 'string',
                    description: 'the case state'
                },
                confirmed: {
                    type: 'boolean',
                    description: 'the case confirmed or not'
                }
            },
        },
        response: {
            200: {
                type: "array",
                items: Case,
            },
        },
    },
    handler: getCases,
}

const getCaseOpts = {
    schema: {
        descriptions: "list of cases",
        tags: ['case'],
        response: {
            200: Case,
        },
    },
    handler: getCase,
}


const postCaseOpts = {
    schema: {
        descriptions: "list of cases",
        tags: ['case'],
        body: NewCase,
        response: {
            201: Case,
        },
    },

    handler: addCase,
}

const putCaseOpts = {
    schema: {
        descriptions: "list of cases",
        tags: ['case'],
        params: {
            id: { type: 'number' },
        },
        body: NewCase,
        response: {
            201: Case,
        },
    },

    handler: updateCase,
}


const deleteCaseOpts = {
    schema: {
        descriptions: "list of cases",
        tags: ['case'],
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

    handler: deleteCase,
}

function caseRoutes(fastify, options, done) {
    fastify.get("/cases", getCasesOpts)
    fastify.get("/cases/:id", getCaseOpts)
    fastify.post("/cases", postCaseOpts)
    fastify.put("/cases/:id", putCaseOpts)
    fastify.delete("/cases/:id", deleteCaseOpts)
    done()
}

export default caseRoutes;

