import { getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment } from "../controllers/appointments.js";

const NewAppointment = {
    type: "object",
    properties: {
        id: { type: "integer" },
        appointmentname: { type: "string" },
        password: { type: "string", format: "password" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

const Appointment = {
    type: "object",
    properties: {
        id: { type: "integer" },
        appointmentname: { type: "string" },
        email: { type: "string", format: "email" },
        role: { type: "string" },
        state: { type: "string" },
        created_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" }
    },
}

// Options to get all items
const getAppointmentsOpts = {
    schema: {
        descriptions: "list of appointments",
        tags: ['appointment'],
        params: {
            type: 'object',
            properties: {
                role: {
                    type: 'string',
                    description: 'the appointment role'
                },
                state: {
                    type: 'string',
                    description: 'the appointment state'
                },
                confirmed: {
                    type: 'boolean',
                    description: 'the appointment confirmed or not'
                }
            },
        },
        response: {
            200: {
                type: "array",
                items: Appointment,
            },
        },
    },
    handler: getAppointments,
}

const getAppointmentOpts = {
    schema: {
        descriptions: "list of appointments",
        tags: ['appointment'],
        response: {
            200: Appointment,
        },
    },
    handler: getAppointment,
}


const postAppointmentOpts = {
    schema: {
        descriptions: "list of appointments",
        tags: ['appointment'],
        body: NewAppointment,
        response: {
            201: Appointment,
        },
    },

    handler: addAppointment,
}

const putAppointmentOpts = {
    schema: {
        descriptions: "list of appointments",
        tags: ['appointment'],
        params: {
            id: { type: 'number' },
        },
        body: NewAppointment,
        response: {
            201: Appointment,
        },
    },

    handler: updateAppointment,
}


const deleteAppointmentOpts = {
    schema: {
        descriptions: "list of appointments",
        tags: ['appointment'],
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

    handler: deleteAppointment,
}

function appointmentRoutes(fastify, options, done) {
    fastify.get("/appointments", getAppointmentsOpts)
    fastify.get("/appointments/:id", getAppointmentOpts)
    fastify.post("/appointments", postAppointmentOpts)
    fastify.put("/appointments/:id", putAppointmentOpts)
    fastify.delete("/appointments/:id", deleteAppointmentOpts)
    done()
}

export default appointmentRoutes;

