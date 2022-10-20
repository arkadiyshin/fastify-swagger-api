import { getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment } from "../controllers/appointments.js";

const Appointment = {
    type: "object",
    properties: {
        id: { type: "integer" },
        case_id: { type: "integer" },
        date: { type: "string", format: "date" },
        time_from: { type: "string", format: "time" },
        time_to: { type: "string", format: "time" }
    },
}


// Options to get all items
const getAppointmentsOpts = {
    schema: {
        summary: "Get list of appointments",
        descriptions: "Get list of appointments",
        tags: ['appointment'],
        querystring: {
            case_id: { type: "integer" },
            date_from: { type: "string", format: "date"  },
            date_to: { type: "string", format: "date"  },
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

const getAppointmentByCaseOpts = {
    schema: {
        summary: "Get single appointment",
        descriptions: "Get single appointment",
        tags: ['appointment'],
        params: {
            case_id: { type: 'number' },
        },
        response: {
            200: Appointment,
        },
    },
    handler: getAppointment,
}


const postAppointmentOpts = {
    schema: {
        summary: "Create a new appointment",
        descriptions: "Create a new appointment",
        tags: ['appointment'],
        body: Appointment,
        response: {
            201: Appointment,
        },
    },

    handler: addAppointment,
}

const putAppointmentByCaseOpts = {
    schema: {
        summary: "Change an appointment",
        descriptions: "Change an appointment",
        tags: ['appointment'],
        params: {
            case_id: { type: 'number' },
            id: { type: 'number' },
        },
        body: Appointment,
        response: {
            201: Appointment,
        },
    },

    handler: updateAppointment,
}


const deleteAppointmentByCaseOpts = {
    schema: {
        summary: "Delete an appointment",
        descriptions: "Delete an appointment",
        tags: ['appointment'],
        params: {
            case_id: { type: 'number' },
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
    fastify.get("/appointments/:case_id", getAppointmentByCaseOpts)
    fastify.post("/appointments", postAppointmentOpts)
    fastify.put("/appointments/:case_id/:id", putAppointmentByCaseOpts)
    fastify.delete("/appointments/:case_id/:id", deleteAppointmentByCaseOpts)
    done()
}

export default appointmentRoutes;

