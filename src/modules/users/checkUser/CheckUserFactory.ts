import { PrismaUsersRepository } from "../../../respositories/prisma/PrismaUsersRepository";
import { CheckUserController } from "./CheckUserController";
import { CheckUserService } from "./CheckUserService";

export const CheckUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const checkUserService = new CheckUserService(usersRepository);
  const checkUserController = new CheckUserController(checkUserService);

  return checkUserController;
};
