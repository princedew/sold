import {Router} from "express";
import { login } from "./authHandlers/login.js";
import { magicLink } from "./authHandlers/magicLink.js";
import { signUp } from "./authHandlers/signup.js";
import { loginWithPassword } from "./authHandlers/loginWithPassword.js";
import { loginPwasswordSchema, loginSchema, magicLinkSchema, signupSchema } from "@packages/zodSchema/authSchema.js";
import { validate } from "@packages/middlewares/reqValidationMiddleware.js";

const appRouter = Router();

appRouter.post("/signup", validate(signupSchema), signUp);
appRouter.post("/login",validate(loginSchema), login);
appRouter.post("/login/pw",validate(loginPwasswordSchema), loginWithPassword);
appRouter.post("/magic",validate(magicLinkSchema), magicLink);

export default appRouter;