import { Request, RequestHandler, Response } from "express";
import { UserService } from "./users.service";
import { isValidObjectId } from "mongoose";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAll();

    if (!users) {
      return res.status(404).json({
        message: "No user found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Users sucessfully fetched",
      data: users,
    });
  }
  static async getUserDetailsById(req: Request, res: Response) {
    const userId = req.params["userId"];

    const validId = isValidObjectId(userId);

    if (!validId) {
      return res.status(400).json({
        message: "Invalid ObjectId",
        data: [],
      });
    }

    const userDetails = await UserService.getUserDetailsById(userId);

    if (!userDetails) {
      return res.status(404).json({
        message: "User details not found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
    });
  }
}
