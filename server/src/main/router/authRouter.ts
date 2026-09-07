import {Router} from "express";
import { signUp } from "../handlers/authHandlers/signup.js";
import { magicLink } from "../handlers/authHandlers/magicLink.js";
import { login } from "../handlers/authHandlers/login.js";

const appRouter = Router();

appRouter.post("/signup", signUp);
appRouter.post("/login", login);
appRouter.post("/magic-link", magicLink);

export default appRouter;