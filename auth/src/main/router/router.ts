import {Router} from "express";
import { signUp } from "../handlers/signup.js";
import { magicLink } from "../handlers/magicLink.js";
import { login } from "../handlers/login.js";

const appRouter = Router();

appRouter.post("/signup", signUp);
appRouter.post("/login", login);
appRouter.post("/magic-link", magicLink);

export default appRouter;