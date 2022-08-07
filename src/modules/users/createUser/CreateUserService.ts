import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../respositories/types/IUsersRepository";

type Request = {
  name: string;
  email: string;
  password: string;
};

type Response = {
  user: Omit<User, "password">;
};

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: Request): Promise<Response> {
    const userExists = await this.usersRepository.exists({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await this.usersRepository.create(
      name,
      email,
      hashedPassword
    );

    const { password: _, ...user } = newUser;

    return { user };
  }
}
