import { Post } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import { IPostsRepository } from "../../../respositories/types/IPostsRepository";

export class ListPostService {
  constructor(private postRepository: IPostsRepository) {}

  async execute(): Promise<Post[]> {
    const posts = await this.postRepository.getAll();

    if (!posts) {
      throw new AppError("Nenhum post encontrado");
    }

    return posts;
  }
}
