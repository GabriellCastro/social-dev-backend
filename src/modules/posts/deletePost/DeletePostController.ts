import { Request, Response } from "express";
import { DeletePostService } from "./DeletePostService";

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = res.locals;

    await this.deletePostService.execute({ id: Number(id), userId });

    return res.status(204).send();
  }
}
