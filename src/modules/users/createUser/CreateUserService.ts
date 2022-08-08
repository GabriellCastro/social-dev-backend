import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
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

const schema = Yup.object({
  name: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 2 caracteres"),
  email: Yup.string().required("O email é obrigatório").email(),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: Request): Promise<Response> {
    await schema.validate({ name, email, password });
    
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
