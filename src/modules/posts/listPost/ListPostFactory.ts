import { PrismaPostsRepository } from "../../../respositories/prisma/PrismaPostsRepository";
import { ListPostController } from "./ListPostController";
import { ListPostService } from "./ListPostService";

export const ListPostFactory = () => {
  const postsRepository = new PrismaPostsRepository();
  const listPostService = new ListPostService(postsRepository);
  const listPostController = new ListPostController(listPostService);

  return listPostController;
};
