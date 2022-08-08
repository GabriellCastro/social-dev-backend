import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { CheckUserFactory } from "../modules/users/checkUser/CheckUserFactory";
import { CreateUserFactory } from "../modules/users/createUser/CreateUserFactory";
import { LoginUserFactory } from "../modules/users/loginUser/LoginUserFactory";

const usersRouter = Router();

usersRouter.post("/register", (req, res) =>
  CreateUserFactory().handle(req, res)
);

usersRouter.post("/login", (req, res) => LoginUserFactory().handle(req, res));

usersRouter.get("/check", ensureAuthenticated, (req, res) =>
  CheckUserFactory().handle(req, res)
);

export { usersRouter };
