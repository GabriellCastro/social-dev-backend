import { Prisma, User } from "@prisma/client";

export type IUsersRepository = {
  create(name: string, email: string, password: string): Promise<User>;
  exists(args: Prisma.UserFindUniqueArgs): Promise<boolean>;
  find(email: string): Promise<any>;
};
