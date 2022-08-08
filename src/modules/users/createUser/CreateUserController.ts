import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const { user } = await this.createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({ user });
  }
}
