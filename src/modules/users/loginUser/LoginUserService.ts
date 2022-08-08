import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as Yup from "yup";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../respositories/types/IUsersRepository";

type Request = {
  email: string;
  password: string;
};

type Response = {
  user: Omit<User, "password">;
  token: string;
};

const schema = Yup.object({
  email: Yup.string().required("O email é obrigatório").email(),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class LoginUserService {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ email, password }: Request): Promise<Response> {
    await schema.validate({ email, password });

    const userLocated = await this.usersRepository.find(email);

    if (!userLocated) {
      throw new AppError("Email ou Senha inválidos!");
    }

    const isValid = await bcrypt.compare(password, userLocated.password);

    if (!isValid) {
      throw new AppError("Email ou Senha inválidos!");
    }

    const token = sign(
      { id: userLocated.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...user } = userLocated;

    return { user, token };
  }
}
