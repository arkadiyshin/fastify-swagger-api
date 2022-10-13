import { getCases, getCase, addCase, updateCase, deleteCase } from "../controllers/cases.js";

/*
const Case = {
    type: "object",
    properties: {
        id: { type: "integer" },
        create_time: { type: "string", format: "date-time" },
        client_first_name: { type: "string"},
        client_last_name: { type: "string"},
        client_phone: { type: "string"},
        client_email: { type: "string", format: "email" },
        address: { type: "string"},
        type_of_property: { type: "string"},
        floor: { type: "integer"},
        elevator: { type: "integer"},
        squaremeters: { type: "integer" },
        inspector_id: { type: "integer" },
        inspector: { type: "string"},
        manager_id: { type: "integer" },
        manager: { type: "string"},
        // state: { type: "string" },
        // quantity: { type: "integer" },
        // way_to_property: { type: "string", format: "date-time" },
        // confirmed_time: { type: "string", format: "date-time" }
    },
}
 */


const CaseCoreSchema = {
    type: "object",
    properties: {
        client_phone: { type: "string" },
        client_email: { type: "string", format: "email" },
        address: { type: "string" }
    }
}

const CaseExtendSchema = {
    type: "object",
    properties: {
        client_first_name: { type: "string" },
        client_last_name: { type: "string" },
        type_of_property: { type: "string" },
        floor: { type: "integer" },
        elevator: { type: "integer" },
        squaremeters: { type: "integer" },
        quantity: { type: "integer" },
        way_to_property: { type: "string" }
    }
}

const CaseFullSchema = {
    type: "object",
    properties: {
        ...{ ...CaseCoreSchema.properties }, ...{ ...CaseExtendSchema.properties },
        create_time: { type: "string", format: "date-time" },
        assigned_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" },
        state_id: { type: "integer" },
        state: { type: "string" },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    }
}

const CaseItemCoreSchema = {
    type: "object",
    properties: {
        room: { type: "integr" },
        description: { type: "string" }
    }
}

const CaseItemFullSchema = {
    type: "object",
    properties: {
        ...{ ...CaseItemCoreSchema.properties },
        room_title: { type: "string" },
        photo_link: { type: "string" },
        quantity: { type: "integer" }
    }
}



// Options to get all items
const getCasesOpts = {
    schema: {
        summary: "Get list of cases",
        description: "Get list of cases filtered by: data ceration, state, inspector, manager",
        tags: ['case'],
        params: {
            date_from: { type: "string", format: "date-time" },
            date_to: { type: "string", format: "date-time" },
            state_id: { type: "integer" },
            state: { type: "string" },
            inspector_id: { type: "integer" },
            inspector: { type: "string" },
            manager_id: { type: "integer" },
            manager: { type: "string" },
        },
        response: {
            200: {
                type: "array",
                items: CaseFullSchema,
            },
        },
    },
    handler: getCases,
}

const getCaseOpts = {

    schema: {
        summary: "Get single case by id",
        description: "Get single case by id",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                CaseFullSchema
            },
        },
    },
    handler: getCase,
}

const postCaseOpts = {
    schema: {
        summary: "Create a new case",
        description: "Create a new case with necessary information",
        tags: ['case'],
        body: CaseCoreSchema,
        response: {
            201: CaseCoreSchema,
        },
    },

    handler: addCase,
}

const updateCaseOpts = {
    schema: {
        summary: "Update the case by id",
        description: "Update the case by id",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: CaseCoreSchema,
        response: {
            201: CaseCoreSchema,
        },
    },

    handler: updateCase,
}

const changeCaseOpts = {
    schema: {
        summary: "Add info to case by id",
        description: "Add info to case by id",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: CaseExtendSchema,
        response: {
            201: CaseFullSchema,
        },
    },

    handler: () => { },
}

const assignCaseOpts = {
    schema: {
        summary: "Manager assigns case to inspector",
        description: "Manager assigns case to inspector",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: { inspector_id: { type: "integer" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const reAssignCaseOpts = {
    schema: {
        summary: "Manager re-assigns case to inspector",
        description: "Manager re-assigns case to inspector",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: { inspector_id: { type: "integer" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const declineCaseOpts = {
    schema: {
        summary: "Inspector declines assignement",
        description: "Inspector declines assignement",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const acceptCaseOpts = {
    schema: {
        summary: "Inspector accepts assignement",
        description: "Inspector accepts assignement",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const invalidateCaseOpts = {
    schema: {
        summary: "Manager invalidates some information",
        description: "Manager invalidates some information",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const fillAllCaseOpts = {
    schema: {
        summary: "Inspector fills in all information",
        description: "Inspector fills in all information",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const quoteCaseOpts = {
    schema: {
        summary: "Manager sends quote to household owner",
        description: "Manager sends quote to household owner",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const closeCaseOpts = {
    schema: {
        summary: "Manager closes case",
        description: "Manager closes case",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const deleteCaseOpts = {
    schema: {
        summary: "Delete case by id",
        description: "Delete case by id",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            201: CaseCoreSchema,
        },
    },

    handler: updateCase,
}

function caseRoutes(fastify, options, done) {
    fastify.get("/cases", getCasesOpts)
    fastify.get("/cases/:caseId", getCaseOpts)
    fastify.post("/cases", postCaseOpts)
    fastify.put("/cases/:caseId", updateCaseOpts)
    fastify.patch("/cases/:caseId", changeCaseOpts)
    // state
    fastify.patch("/cases/:caseId/assign", assignCaseOpts)
    fastify.patch("/cases/:caseId/reAssign", reAssignCaseOpts)
    fastify.patch("/cases/:caseId/decline", declineCaseOpts)
    fastify.patch("/cases/:caseId/accept", acceptCaseOpts)
    fastify.patch("/cases/:caseId/invalidate", invalidateCaseOpts)
    fastify.patch("/cases/:caseId/fillAll", fillAllCaseOpts)
    fastify.patch("/cases/:caseId/quote", quoteCaseOpts)
    fastify.patch("/cases/:caseId/close", closeCaseOpts)

    // fastify.delete("/cases/:caseId", deleteCaseOpts)

    done()
}

export default caseRoutes;

