import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const newUserCoreSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
  },
};

const extendNewUserCoreSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    password: { type: "string", format: "password" },
    ...{ ...newUserCoreSchema.properties },
    role: { type: "string" },
  },
};

// const coreUserRoleSchema = {
//   type: "object",
//   properties: {
//     inspector_role: { type: "string" },
//     manager_role: { type: "string" },
//   },
// };

const coreUserSchema = {
  type: "object",
  properties: {
    ...{ ...extendNewUserCoreSchema.properties },
    state: { type: "string" },
    created_time: { type: "string", format: "date-time" },
    confirmed_time: { type: "string", format: "date-time" },
  },
};

// const UserConfirmSchema = {
//   username: { type: "string" },
//   password: { type: "string", format: "password" },
// };

const getUsersOpts = {
  schema: {
    descriptions: "get list of all users",
    tags: ["user"],
    params: {
      role: { type: "string" },
    },
    response: {
      200: {
        type: "array",
        items: coreUserSchema,
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    descriptions: "list of users",
    tags: ["user"],
    params: {
      id: { type: "integer" },
      role: { type: "string" },
    },
    response: {
      200: {
        type: "array",
        items: coreUserSchema,
      },
    },
  },
  handler: getUser,
};

const getUsersRoleOpts = {
  schema: {
    descriptions: "get list of all users",
    tags: ["user-Role"],
    params: {
      role: {type: "string" },
    },
    response: {
      200: {
        type: "array",
        items: coreUserSchema,
      },
    },
  },
  handler: getUser,
};

const postNewUserOpts = {
  schema: {
    summary: "Create a new user",
    description: "Create a new user",
    tags: ["new-user"],
    body: { newUserCoreSchema },
    response: {
      200: {
        description: "successful operation",
        type: "string",
      },
    },
  },

  handler: addUser,
};

const confirmedNewUserOpts = {
  schema: {
    // summary: "After email token comfirmation all new user will continue to fill out the rest of the registration form",
    description: "Confirm user",
    tags: ["extended-new-user"],
    params: {
      id: { type: "integer" },
    },
    body: extendNewUserCoreSchema,
    response: {
      200: {
        description: "successful operation",
        items: coreUserSchema,
      },
    },
  },

  handler: () => {},
};

const coreUpdateUserOpts = {
  schema: {
    descriptions: "General profile update endpoint",
    tags: ["user"],
    params: {
      id: { type: "number" },
    },
    body: coreUserSchema,
    response: {
      201: {
        description: "successful operation",
        items: coreUserSchema,
      },
    },
  },

  handler: updateUser,
};

const changeUserRoleOpts = {
  schema: {
    descriptions: "change user role ",
    tags: ["user"],
    params: {
      id: { type: "integer" },
    },
    body:  { ...coreUserSchema.properties.role },
    response: {
      201: {
        description: "successful operation",
        items: coreUserSchema.properties,
      },
    },
  },

  handler: updateUser,
};

const userSetNewPasswordOpts = {
  schema: {
    descriptions: "this is where you set a new password",
    tags: ["user"],
    params: {
      id: { type: "number" },
    },
    body: { new_Password: { type: "string" } },
    response: {
      201: {
        description: "successful operation",
        items: coreUserSchema,
      },
    },
  },

  handler: updateUser,
};

const userForgotPassOpts = {
  schema: {
    descriptions:
      "if you forget your password, this endpoint will will ask for your email address if email already exists you will be redirected to the new password endpoint",
    tags: ["user"],
    params: {
      id: { type: "number" },
    },
    body: { ...newUserCoreSchema.properties.email },
    response: {
      201: {
        description: "successful operation",
        items: userSetNewPasswordOpts,
      },
    },
  },

  handler: updateUser,
};

const deleteUserOpts = {
  schema: {
    descriptions: "for dev team only, delete user",
    tags: ["delete-user"],
    params: {
      id: { type: "number" },
    },
    response: {
      201: {
        description: "successful operation",
        items: coreUserSchema,
      },
    },
  },

  handler: updateUser,
};

function userRoutes(fastify, options, done) {
  fastify.get("/users", getUsersOpts);
  fastify.get("/users/:id", getUserOpts);
  fastify.get("/users/role/", getUsersRoleOpts);
  fastify.post("/users/register/", postNewUserOpts);
  fastify.post("/users/:id/confirm/", confirmedNewUserOpts);
  fastify.put("/users/:id/", coreUpdateUserOpts);

  fastify.patch("/users/:id/forgotPassword/", userForgotPassOpts);
  fastify.patch("/users/:id/setNewPassword/", userSetNewPasswordOpts);
  fastify.patch("/users/:id/changeRole", changeUserRoleOpts);
  fastify.delete("/users/:id", deleteUserOpts);

  done();
}

export default userRoutes;
