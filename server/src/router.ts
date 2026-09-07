import {Router} from "express";
import { signUp } from "./handler.js";

const appRouter = Router();

appRouter.get("/signup", signUp);


export default appRouter;