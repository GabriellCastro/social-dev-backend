import { PrismaPostsRepository } from "../../../respositories/prisma/PrismaPostsRepository";
import { DeletePostController } from "./DeletePostController";
import { DeletePostService } from "./DeletePostService";

export const DeletePostFactory = () => {
  const postsRepository = new PrismaPostsRepository();
  const deletePostService = new DeletePostService(postsRepository);
  const deletePostController = new DeletePostController(deletePostService);

  return deletePostController;
};
