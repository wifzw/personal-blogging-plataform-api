import { z } from "zod";
import { FastifyInstanceTypedZod } from "../../../types/fastify-instance-typed-zod";
import { UsersControllers } from "../controllers/users-controllers";
import { createUserSchema } from "../schemas/create-user-schema";
import { findUsersSchema } from "../schemas/find-users-schema";
import { UsersServices } from "../services/users-services";
import { updateUserSchema } from "../schemas/update-user-schema";

export const usersRoute = (app: FastifyInstanceTypedZod) => {
  const usersServices = new UsersServices();
  const usersControllers = new UsersControllers(usersServices);

  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        response: {
          200: findUsersSchema,
          500: z.object({ error: z.string() }).describe("error to get users"),
        },
      },
    },
    usersControllers.findUsers.bind(usersControllers)
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create new user",
        body: createUserSchema,
        response: {
          201: z.null().describe("User created"),
          500: z.object({ error: z.string() }).describe("error to create user"),
        },
      },
    },
    usersControllers.createUser.bind(usersControllers)
  );

  app.put(
    "/users/:userId",
    {
      schema: {
        tags: ["users"],
        description: "Update user",
        body: updateUserSchema,
        response: {
          200: z.null().describe("User updated"),
          500: z.object({ error: z.string() }).describe("error to update user"),
        },
      },
    },
    usersControllers.updateUser.bind(usersControllers)
  );

  app.delete(
    "/users/:userId",
    {
      schema: {
        tags: ["users"],
        description: "Remove user",
        response: {
          200: z.null().describe("User removed"),
          500: z.object({ error: z.string() }).describe("error to remove user"),
        },
      },
    },
    usersControllers.deleteUser.bind(usersControllers)
  );
};
