import { PrismaPostsRepository } from "../../../respositories/prisma/PrismaPostsRepository";
import { EditPostController } from "./EditPostController";
import { EditPostService } from "./EditPostService";

export const EditPostFactory = () => {
  const postsRepository = new PrismaPostsRepository();
  const editPostService = new EditPostService(postsRepository);
  const editPostController = new EditPostController(editPostService);

  return editPostController;
};
