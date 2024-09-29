import { RequestHandler, Router } from "express";
import { UserController } from "./users.controller";

export const UsersRouter = Router();

// GET all users
UsersRouter.get("/", UserController.getAllUsers as unknown as RequestHandler);

// GET user with all details by userId
UsersRouter.get(
  "/:userId",
  UserController.getUserDetailsById as unknown as RequestHandler,
);
