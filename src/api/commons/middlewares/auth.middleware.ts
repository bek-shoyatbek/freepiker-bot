import { NextFunction, Request, Response } from "express";
import crypto from "node:crypto";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get credentials from request headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract username and password from Basic Auth header
  const [type, credentials] = authHeader.split(" ");

  if (type !== "Basic") {
    return res.status(401).json({ message: "Invalid authorization type" });
  }

  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

  // Compare with .env values
  const envUsername = process.env.AUTH_USERNAME;
  const envPassword = process.env.AUTH_PASSWORD;

  if (!envUsername || !envPassword) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  // Use constant-time comparison to prevent timing attacks
  const usernameMatch = crypto.timingSafeEqual(
    Buffer.from(username),
    Buffer.from(envUsername),
  );
  const passwordMatch = crypto.timingSafeEqual(
    Buffer.from(password),
    Buffer.from(envPassword),
  );

  if (usernameMatch && passwordMatch) {
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
