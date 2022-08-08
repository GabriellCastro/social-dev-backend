import { Post } from "@prisma/client";
import { prisma } from "../../database/client";
import { IPostsRepository } from "../types/IPostsRepository";

export class PrismaPostsRepository implements IPostsRepository {
  async getAll(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    return posts;
  }

  async create(
    title: string,
    content: string,
    authorId: number
  ): Promise<Post> {
    const post = await prisma.post.create({
      data: { title, content, author: { connect: { id: authorId } } },
    });

    return post;
  }

  async edit(id: number, title: string, content: string): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return post;
  }

  async delete(id: number): Promise<Post> {
    const post = await prisma.post.delete({ where: { id } });

    return post;
  }

  async findById(id: number): Promise<Post | null> {
    const post = await prisma.post.findFirst({ where: { id } });

    return post;
  }

  async update(id: number, title: string, content: string): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return post;
  }
}
