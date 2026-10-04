import { Router } from "express";
import { login } from "./authHandlers/login.js";
import { signUp } from "./authHandlers/signup.js";
import { refresh } from "./authHandlers/refresh.js";
import { loginSchema, signupSchema } from "@packages/zodSchema/authSchema.js";
import { validate } from "@packages/middlewares/reqValidationMiddleware.js";

const appRouter = Router();

appRouter.post("/signup", validate(signupSchema), signUp);
appRouter.post("/login", validate(loginSchema), login);
appRouter.post("/refresh", refresh);

export default appRouter;
