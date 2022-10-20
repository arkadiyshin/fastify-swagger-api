import {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} from "../controllers/users.js";

const newUserSchema = {
    //$id: "newUser",
    type: "object",
    properties: {
        email_address: { type: "string", format: "email" },
    },
};

const newUserExtendedSchema = {
    //$id: "extedNewUser",
    type: "object",
    properties: {
        id: { type: "integer" },
        username: { type: "string" },
        password: { type: "string", format: "password" },
        ...{ ...newUserSchema.properties },
        role: { type: "string" },
    },
};

const userFullSchema = {
    //$id: "fullUser",
    type: "object",
    properties: {
        ...{ ...newUserExtendedSchema.properties },
        state: { type: "string" },
        created_time: { type: "string" },
        confirmed_time: { type: "string" },
    },
};


const getUsersOpts = {
    schema: {
        summary: "user list",
        description: "get list of all users: role-filter",
        tags: ["user"],
        querystring: {
            role: { type: "string" },
        },
        response: {
            200: {
                type: "array",
                items: userFullSchema,
            },
        },
    },
    handler: getUsers,
};

const getUserOpts = {
    schema: {
        summary: "single user list",
        description: "get list of a single users: role-filter, id-filter",
        tags: ["user"],
        params: {
            id: { type: "string" },
        },
        querystring: {
            role: { type: "string" },
        },
        response: {
            200: {
                type: "array",
                items: userFullSchema,
            },
        },
    },
    handler: getUser,
};

const postNewUserOpts = {
    schema: {
        summary: "Create a new user",
        description: "Create a new case with only email address before confirmation",
        tags: ["user"],
        body: newUserSchema.properties.email_address,
        response: {
            201: {
                type: "array",
                items: newUserSchema,
            },
        },
    },

    handler: addUser,
};

const confirmedNewUserOpts = {
    schema: {
        summary: "Confirm user",
        description:
            "After email token comfirmation all new user will continue to fill out the rest of the registration form",
        tags: ["user"],
        params: {
            id: { type: "integer" },
        },
        body: newUserExtendedSchema.properties,
        response: {
            201: {
                type: "array",
                items: userFullSchema,
            },
        },
    },

    handler: () => { },
};

const coreUpdateUserOpts = {
    schema: {
        summary: "Update user information",
        description: "update all user information",
        tags: ["user"],
        params: {
            id: { type: "integer" },
        },
        body: userFullSchema,
        response: {
            201: {
                type: "array",
                items: userFullSchema,
            },
        },

    },

    handler: updateUser,
};


const userSetNewPasswordOpts = {
    schema: {
        summary: "set a new password if you forgot your previous password",
        description: "update user password",
        tags: ["user"],
        params: {
            id: { type: "integer" },
        },
        body: { new_Password: { type: "string" } },
        response: {
            201: {
                type: "array",
                items: userFullSchema,
            },
        },
    },

    handler: updateUser,
};

const userForgotPassOpts = {
    schema: {
        summary: "use user email address to request to set a new password",
        description: "user forgot password",
        tags: ["user"],
        params: {
            id: { type: "integer" },
        },
        body: newUserSchema.properties.email_address,
        response: {
            201: {
                type: "array",
                items: { ...userSetNewPasswordOpts.schema },
            },
        },
    },

    handler: updateUser,
};

const deleteUserOpts = {
    schema: {
        summary: "for dev team only",
        description: "delete user",
        tags: ["user"],
        params: {
            id: { type: "integer" },
        },
        response: {
            201: {
                type: "array",
                items: userFullSchema,
            },
        },
    },

    handler: updateUser,
};

function userRoutes(fastify, options, done) {
    fastify.get("/users", getUsersOpts);
    fastify.get("/users/:id", getUserOpts);
    //fastify.get("/users/role/", getUsersRoleOpts);
    fastify.post("/users/register/", postNewUserOpts);
    fastify.post("/users/:id/confirm/", confirmedNewUserOpts);
    fastify.put("/users/:id/", coreUpdateUserOpts);

    fastify.patch("/users/:id/forgotPassword/", userForgotPassOpts);
    fastify.patch("/users/:id/setNewPassword/", userSetNewPasswordOpts);
    //fastify.patch("/users/:id/changeRole", changeUserRoleOpts);
    fastify.delete("/users/:id", deleteUserOpts);

    done();
}

export default userRoutes;
