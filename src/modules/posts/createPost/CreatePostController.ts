import { Request, Response } from "express";
import { CreatePostService } from "./CreatePostService";

export class CreatePostController {
  constructor(private createPostService: CreatePostService) {}

  async handle(req: Request, res: Response) {
    const { title, content } = req.body;
    const { userId } = res.locals;

    const post = await this.createPostService.execute({
      title,
      content,
      authorId: Number(userId),
    });

    return res.status(200).json({ post });
  }
}
