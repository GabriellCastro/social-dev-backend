import { Request, Response } from "express";
import { ListPostService } from "./ListPostService";

export class ListPostController {
  constructor(private listPostService: ListPostService) {}

  async handle(req: Request, res: Response) {
    const posts = await this.listPostService.execute();

    return res.json(posts);
  }
}
