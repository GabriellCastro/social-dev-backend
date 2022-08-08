import { Router } from "express";
import { postsRouter } from "./posts.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export { router };
