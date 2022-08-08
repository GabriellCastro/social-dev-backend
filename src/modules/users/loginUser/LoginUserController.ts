import { Request, Response } from "express";
import { LoginUserService } from "./LoginUserService";

export class LoginUserController {
  constructor(private loginUserService: LoginUserService) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const { user, token } = await this.loginUserService.execute({
      email,
      password,
    });

    return res.status(200).json({ user, token });
  }
}
