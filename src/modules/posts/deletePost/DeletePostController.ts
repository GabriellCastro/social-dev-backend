import { Request, Response } from "express";
import { DeletePostService } from "./DeletePostService";

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;
    const { userId } = res.locals;

    await this.deletePostService.execute({ id, userId });

    return res.status(204).send();
  }
}
