import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from '@fastify/swagger';
import userRoutes from './routes/users.js';
import caseRoutes from './routes/cases.js';
import appointmentRoutes from './routes/appointments.js';
import logRoutes from './routes/logs.js';

const app = Fastify({
    logger: false,
});

// Use CORS and SWAGGER plnugins
await app.register(cors, {});
await app.register(swagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api' },
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'case', description: 'Case related end-points' }
        ],
    },
})



app.register(userRoutes);
app.register(caseRoutes);
app.register(appointmentRoutes);
app.register(logRoutes);

app.get("/", (req, reply) => {
    reply.send();
});


// The server waiting loop.
await app.listen({ port: 3000 });
