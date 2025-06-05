import { prisma } from "../../../lib/prisma";
import { CreateUser } from "../schemas/create-user-schema";
import { UpdateUser } from "../schemas/update-user-schema";

export class UsersServices {
  constructor() {}
  async findAll() {
    return await prisma.users.findMany();
  }

  async find(userId: string) {
    return await prisma.users.findUnique({ where: { id: userId } });
  }

  async findByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }

  async create(createUser: CreateUser) {
    return await prisma.users.create({ data: createUser });
  }

  async update(userId: string, updateUser: UpdateUser) {
    return await prisma.users.update({
      data: updateUser,
      where: { id: userId },
    });
  }

  async delete(userId: string) {
    return await prisma.users.delete({ where: { id: userId } });
  }
}
