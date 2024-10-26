import { Request, RequestHandler, Response } from "express";
import { isValidObjectId } from "mongoose";
import { PaymentService } from "./payments.service";

export class PaymentsController {
  static async getAllPayments(req: Request, res: Response) {
    const payments = await PaymentService.getAll();

    if (!payments) {
      return res.status(404).json({
        message: "No payments found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "payments sucessfully fetched",
      data: payments,
    });
  }
}
