import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    console.log("Username ", username, "\n Password ", password);

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required!",
      });
    }

    const token = await AuthService.login({ username, password });

    console.log("Token : ", token);
    if (!token) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      message: "Login sucessfully",
      token,
    });
  }
}
