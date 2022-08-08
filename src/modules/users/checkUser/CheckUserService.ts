import { User } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../respositories/types/IUsersRepository";

type Request = {
  userId: string;
};

export class CheckUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: Request): Promise<User> {
    const user = await this.usersRepository.findById(Number(userId));

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    return user;
  }
}
