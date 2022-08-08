import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { CreatePostFactory } from "../modules/posts/createPost/CreatePostFactory";
import { DeletePostFactory } from "../modules/posts/deletePost/DeletePostFactory";
import { EditPostFactory } from "../modules/posts/editPost/EditPostFactory";
import { ListPostFactory } from "../modules/posts/listPost/ListPostFactory";

const postsRouter = Router();

postsRouter.post("/create", ensureAuthenticated, (req, res) =>
  CreatePostFactory().handle(req, res)
);

postsRouter.get("/list", ensureAuthenticated, (req, res) =>
  ListPostFactory().handle(req, res)
);

postsRouter.delete("/delete/:id", ensureAuthenticated, (req, res) =>
  DeletePostFactory().handle(req, res)
);

postsRouter.put("/edit/:id", ensureAuthenticated, (req, res) =>
  EditPostFactory().handle(req, res)
);

export { postsRouter };
