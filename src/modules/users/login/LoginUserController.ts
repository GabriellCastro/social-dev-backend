import { Request, Response } from "express";
import * as Yup from "yup";
import { LoginUserService } from "./LoginUserService";

const schema = Yup.object({
  email: Yup.string().required("O email é obrigatório").email(),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export class LoginUserController {
  constructor(private userService: LoginUserService) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    await schema.validate({ email, password });

    const { user, token } = await this.userService.execute({
      email,
      password,
    });

    return res.status(200).json({ user, token });
  }
}
