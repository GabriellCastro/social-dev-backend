import { Prisma, User } from "@prisma/client";
import { prisma } from "../../database/client";
import { IUsersRepository } from "../types/IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(name: string, email: string, password: string): Promise<User> {
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    return user;
  }
  async exists(args: Prisma.UserFindUniqueArgs): Promise<boolean> {
    const user = await prisma.user.findUnique(args);

    return !!user;
  }
  async find(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user;
  }
}
