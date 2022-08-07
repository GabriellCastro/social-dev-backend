import { Request, Response } from "express";
import * as Yup from "yup";
import { CreateUserService } from "./CreateUserService";

const schema = Yup.object({
  name: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 2 caracteres"),
  email: Yup.string().required("O email é obrigatório").email(),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class CreateUserController {
  constructor(private userService: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    await schema.validate({ name, email, password });

    const { user, token } = await this.userService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({ user, token });
  }
}
