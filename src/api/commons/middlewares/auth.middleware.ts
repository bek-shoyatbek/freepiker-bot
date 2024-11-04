import { NextFunction, Request, Response } from "express";
import configs from "../../../configs";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get credentials from request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, configs.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    next();
  });
};
