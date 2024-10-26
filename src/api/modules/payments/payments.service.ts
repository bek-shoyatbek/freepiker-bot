import { IPayment, Payment } from "../../../models/payment.model";

export class PaymentService {
  static async getAll(): Promise<any[]> {
    try {
      const payments = await Payment.find()
        .populate(["userId", "planId"])
        .sort({
          status: "asc",
        });
      return payments?.map((payment) => {
        return {
          userId: payment.userId?._id as unknown as string,
          username:
            (payment.userId as any)?.username || (payment.userId as any)?.name,
          plan: (payment.planId as any)?.title,
          status: payment.status,
          startDate: (payment.planId as any)?.startDate,
          endDate: (payment.planId as any)?.endDate,
        };
      });
    } catch (err) {
      console.error("PaymentServiceError: couldn't get payments, ", err);
      throw new Error();
    }
  }
}
