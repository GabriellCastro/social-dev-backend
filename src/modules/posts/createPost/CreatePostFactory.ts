import { PrismaPostsRepository } from "../../../respositories/prisma/PrismaPostsRepository";
import { CreatePostController } from "./CreatePostController";
import { CreatePostService } from "./CreatePostService";

export const CreatePostFactory = () => {
  const postsRepository = new PrismaPostsRepository();
  const createPostService = new CreatePostService(postsRepository);
  const createPostController = new CreatePostController(createPostService);

  return createPostController;
};
