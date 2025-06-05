import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swagger = (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Blogging',
        description: 'Personal Blogging Plataform API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });
  
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
}