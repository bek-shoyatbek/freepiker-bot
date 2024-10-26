import { IPayment, Payment } from "../../../models/payment.model";
import { UserPlan } from "../../../models/user-plan.model";

export class PaymentService {
  static async getAll(): Promise<any[]> {
    try {
      const payments = await UserPlan.find()
        .populate(["userId", "planId"])
        .sort({
          status: "asc",
          startDate: "desc",
        });

      const filteredPayments = payments?.filter((e) => e?.userId);

      return filteredPayments?.map((payment) => {
        return {
          userId: payment.userId?._id as unknown as string,
          username:
            (payment.userId as any)?.username || (payment.userId as any)?.name,
          plan: (payment.planId as any)?.title,
          status: payment.status,
          startDate: payment.startDate,
          endDate: payment.endDate,
        };
      });
    } catch (err) {
      console.error("PaymentServiceError: couldn't get payments, ", err);
      throw new Error();
    }
  }
}
