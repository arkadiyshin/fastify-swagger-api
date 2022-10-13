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
        create_time: { type: "string", format: "date-time" },
        confirm_time: { type: "string", format: "date-time" }
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
        create_time: { type: "string", format: "date-time" },
        confirm_time: { type: "string", format: "date-time" }
    },
}


const UserConfirmSchema = {
    username: { type: "string" },
    password: { type: "string", format: "password" },
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
        summary: "Create a new user",
        description: "Create a new user",
        tags: ['user'],
        body: { email: { type: "string", format: "email" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: addUser,
}

const confirmUserOpts = {
    
    schema: {
        summary: "Confirm user",
        description: "Confirm user",
        tags: ['user'],
        body: { email: { type: "string", format: "email" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: ()=>{},
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
            201: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: updateUser,
}


function userRoutes(fastify, options, done) {
    
    fastify.get("/users", getUsersOpts)
    fastify.get("/users/:id", getUserOpts)
    fastify.post("/users/register/", postUserOpts)
    
    fastify.patch("/users/:id/confirm/", confirmUserOpts)
    fastify.patch("/users/:id/changeActivity/", changeActivityUserOpts)
    fastify.patch("/users/:id", updateUserOpts)
    fastify.patch("/users/:id/changeRole", changeUserRoleOpts)

    fastify.delete("/users/:id", deleteUserOpts)

    done()
}

export default userRoutes;

