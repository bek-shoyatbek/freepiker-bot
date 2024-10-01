import { RequestHandler, Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login as unknown as RequestHandler);
