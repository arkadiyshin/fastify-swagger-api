import { getUsers, getUser, addUser, updateUser, deleteUser } from "../controllers/users.js";

const NewUser = {
    type: "object",
    properties: {
        id: { type: "integer" },
        username: { type: "string" },
        password: { type: "string", format: "password" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

const User = {
    type: "object",
    properties: {
        id: { type: "integer" },
        username: { type: "string" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

const getUsersOpts = {
    
    schema: {
        descriptions: "list of users",
        tags: ['user'],
        params: {
            type: 'object',
            properties: {
                role: {
                    type: 'string',
                    description: 'the user role'
                },
                state: {
                    type: 'string',
                    description: 'the user state'
                },
                confirmed: {
                    type: 'boolean',
                    description: 'the user confirmed or not'
                }
            },
        },
        response: {
            200: {
                type: "array",
                items: User,
            },
        },
    },
    handler: getUsers,
}

const getUserOpts = {
    
    schema: {
        descriptions: "",
        tags: ['user'],
        response: {
            200: User,
        },
    },
    handler: getUser,
}

const postUserOpts = {
    
    schema: {
        descriptions: "",
        tags: ['user'],
        body: NewUser,
        response: {
            201: User,
        },
    },

    handler: addUser,
}

const putUserOpts = {
    schema: {
        descriptions: "",
        tags: ['user'],
        params: {
            id: { type: 'number' },
        },
        body: NewUser,
        response: {
            201: User,
        },
    },

    handler: updateUser,
}


const deleteUserOpts = {
    schema: {
        descriptions: "",
        tags: ['user'],
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

    handler: deleteUser,
}

function userRoutes(fastify, options, done) {
    fastify.get("/users", getUsersOpts)
    fastify.get("/users/:id", getUserOpts)
    fastify.post("/users", postUserOpts)
    fastify.put("/users/:id", putUserOpts)
    fastify.delete("/users/:id", deleteUserOpts)
    done()
}

export default userRoutes;

