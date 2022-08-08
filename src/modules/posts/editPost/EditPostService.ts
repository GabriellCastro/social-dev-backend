import { Post } from "@prisma/client";
import * as Yup from "yup";
import { AppError } from "../../../errors/AppError";
import { IPostsRepository } from "../../../respositories/types/IPostsRepository";

type Request = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

const schema = Yup.object({
  title: Yup.string()
    .min(4, "O título deve ter pelo menos 4 caracteres")
    .max(20, "O título deve ter no máximo 20 caracteres")
    .required("O título é obrigatório"),
  content: Yup.string()
    .min(10, "O conteúdo deve ter pelo menos 10 caracteres")
    .max(255, "O conteúdo deve ter no máximo 255 caracteres")
    .required("O conteúdo é obrigatório"),
});

export class EditPostService {
  constructor(private postRepository: IPostsRepository) {}

  async execute({ id, userId, title, content }: Request): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new AppError("Post não encontrado");
    }

    if (post.authorId !== userId) {
      throw new AppError("Você não tem permissão para editar esse post");
    }

    await schema.validate({ title, content });

    const postUpdate = await this.postRepository.update(id, title, content);

    return postUpdate;
  }
}
