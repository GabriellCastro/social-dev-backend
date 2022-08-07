import { Router } from "express";
import { CreateUserFactory } from "../modules/users/createUser/CreateUserFactory";
import { LoginUserFactory } from "../modules/users/login/LoginUserFactory";

const usersRouter = Router();

usersRouter.post("/register", (req, res) =>
  CreateUserFactory().handle(req, res)
);

usersRouter.post("/login", (req, res) => LoginUserFactory().handle(req, res));

export { usersRouter };
