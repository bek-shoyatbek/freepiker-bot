import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { UserPlanService } from "./user-plans.service";

export class UserPlanController {
  static async getAllUserPlans(req: Request, res: Response) {
    const payments = await UserPlanService.getAll();

    if (!payments) {
      return res.status(404).json({
        message: "No user plan found",
        data: [],
      });
    }

    return res.status(200).json({
      message: " User plans sucessfully fetched",
      data: payments,
    });
  }

  static async deleteUserPlanById(req: Request, res: Response) {
    const userPlanId = req.params["userPlanId"];

    const validId = isValidObjectId(userPlanId);

    if (!validId) {
      return res.status(400).json({
        message: "Invalid ObjectId",
        data: [],
      });
    }

    const deleteResult = await UserPlanService.deleteUserPlan(userPlanId);

    if (!deleteResult) {
      return res.status(400).json({
        message: "User plan not deleted",
        data: [],
      });
    }

    return res.status(200).json({
      message: "User plan deleted",
      data: deleteResult,
    });
  }

}
