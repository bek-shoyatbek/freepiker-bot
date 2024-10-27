import { RequestHandler, Router } from "express";
import { UserPlanController } from "./user-plans.controller";

export const UserPlanRouter = Router();

// GET all users
UserPlanRouter.get(
  "/",
  UserPlanController.getAllUserPlans as unknown as RequestHandler,
);


// DELETE user plan by id
UserPlanRouter.delete(
  "/:userPlanId",
  UserPlanController.deleteUserPlanById as unknown as RequestHandler,
)