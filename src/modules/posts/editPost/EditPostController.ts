import { Request, Response } from "express";
import { EditPostService } from "./EditPostService";

export class EditPostController {
  constructor(private editPostService: EditPostService) {}

  async handle(req: Request, res: Response) {
    const { id, title, content } = req.body;
    const { userId } = res.locals;

    await this.editPostService.execute({ id, userId, title, content });

    return res.status(204).send();
  }
}
