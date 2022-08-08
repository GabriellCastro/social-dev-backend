import { Request, Response } from "express";
import { EditPostService } from "./EditPostService";

export class EditPostController {
  constructor(private editPostService: EditPostService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = res.locals;

    await this.editPostService.execute({
      id: Number(id),
      userId,
      title,
      content,
    });

    return res.status(204).send();
  }
}
