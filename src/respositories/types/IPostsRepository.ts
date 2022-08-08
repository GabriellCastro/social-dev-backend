import { Post } from "@prisma/client";

export type IPostsRepository = {
  getAll(): Promise<Post[]>;
  create(title: string, content: string, authorId: number): Promise<Post>;
  edit(id: number, title: string, content: string): Promise<Post>;
  delete(id: number): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  update(id: number, title: string, content: string): Promise<Post>;
};
