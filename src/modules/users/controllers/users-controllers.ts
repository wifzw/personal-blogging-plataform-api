import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from "../schemas/create-user-schema";
import { UsersServices } from "../services/users-services";
import { birthDateValidation } from "../validations/birth-date";
import { UpdateUser } from "../schemas/update-user-schema";

export class UsersControllers {
  constructor(readonly usersServices: UsersServices) {}

  async findUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.usersServices.findAll();
      return reply.code(200).send(users);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to get users" });
    }
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUser }>,
    reply: FastifyReply
  ) {
    try {
      const { name, birth_date, email } = request.body;

      const { valid, error } = birthDateValidation({
        min_age_user: 16,
        birth_date,
      });

      if (!valid) {
        return reply.code(400).send({ error });
      }

      const isUserRegistred = await this.usersServices.findByEmail(email);

      if (isUserRegistred) {
        return reply.status(400).send({ error: "email is already registered" });
      }

      await this.usersServices.create({
        name,
        birth_date,
        email,
      });

      return reply.code(201).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to create user" });
    }
  }

  async updateUser(
    request: FastifyRequest<{ Params: { userId: string }; Body: UpdateUser }>,
    reply: FastifyReply
  ) {
    try {
      const { name } = request.body;

      const user = await this.usersServices.find(request.params.userId);

      if (!user) {
        return reply.code(400).send({ error: "user not found" });
      }

      await this.usersServices.update(request.params.userId, { name });

      return reply.code(200).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to update user" });
    }
  }

  async deleteUser(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const user = await this.usersServices.find(request.params.userId);

      if (!user) {
        return reply.code(400).send({ error: "user not found" });
      }

      await this.usersServices.delete(request.params.userId);

      return reply.code(200).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to remove user" });
    }
  }
}
