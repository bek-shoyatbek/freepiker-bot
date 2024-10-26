import { RequestHandler, Router } from "express";
import { PaymentsController } from "./payments.controller";

export const PaymentsRouter = Router();

// GET all users
PaymentsRouter.get(
  "/",
  PaymentsController.getAllPayments as unknown as RequestHandler,
);
