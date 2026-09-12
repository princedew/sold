import {Router} from "express";
import { signUp } from "../handlers/authHandlers/signup.js";
import { magicLink } from "../handlers/authHandlers/magicLink.js";
import { login } from "../handlers/authHandlers/login.js";
import { loginSchema, magicLinkSchema, signupSchema } from "../zodSchema/authSchema.js";
import { validate } from "../middlewares/reqValidationMiddleware.js";

const appRouter = Router();

appRouter.post("/auth/signup",validate(signupSchema), signUp);
appRouter.post("/auth/login",validate(loginSchema), login);
appRouter.post("/auth/magic-link",validate(magicLinkSchema), magicLink);

export default appRouter;