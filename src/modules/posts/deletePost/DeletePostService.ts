import { AppError } from "../../../errors/AppError";
import { IPostsRepository } from "../../../respositories/types/IPostsRepository";

type Request = {
  id: number;
  userId: number;
};

export class DeletePostService {
  constructor(private postRepository: IPostsRepository) {}

  async execute({ id, userId }: Request): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    if (post.authorId !== userId) {
      throw new AppError("Você não tem permissão para deletar esse post");
    }

    await this.postRepository.delete(id);
  }
}
