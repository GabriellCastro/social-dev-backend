import { Request, Response } from "express";
import { CheckUserService } from "./CheckUserService";

export class CheckUserController {
  constructor(private checkUserService: CheckUserService) {}

  async handle(req: Request, res: Response) {
    const { userId } = res.locals;

    const user = await this.checkUserService.execute({
      userId,
    });

    return res.status(200).json({ user });
  }
}
