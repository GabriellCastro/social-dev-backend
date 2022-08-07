import { PrismaUsersRepository } from "../../../respositories/prisma/PrismaUsersRepository";
import { LoginUserController } from "./LoginUserController";
import { LoginUserService } from "./LoginUserService";

export const LoginUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const loginUserService = new LoginUserService(usersRepository);
  const loginUserController = new LoginUserController(loginUserService);

  return loginUserController;
};
