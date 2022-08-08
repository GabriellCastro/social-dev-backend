import { Post } from "@prisma/client";
import * as Yup from "yup";
import { IPostsRepository } from "../../../respositories/types/IPostsRepository";

type Request = {
  title: string;
  content: string;
  authorId: number;
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

export class CreatePostService {
  constructor(private postRepository: IPostsRepository) {}
  async execute({ title, content, authorId }: Request): Promise<Post> {
    await schema.validate({ title, content });

    const post = await this.postRepository.create(title, content, authorId);

    return post;
  }
}
