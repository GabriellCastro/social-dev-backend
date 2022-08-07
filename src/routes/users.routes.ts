import { Router } from "express";
import { CreateUserFactory } from "../modules/users/createUser/CreateUserFactory";

const usersRouter = Router();

usersRouter.post("/register", (req, res) =>
  CreateUserFactory().handle(req, res)
);

export { usersRouter };
