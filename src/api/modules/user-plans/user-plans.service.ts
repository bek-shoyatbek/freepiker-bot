import { UserPlan } from "../../../models/user-plan.model";

export class UserPlanService {
  static async getAll() {
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
          from: (payment.userId as any)?.from,
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
    }
  }

  static async deleteUserPlan(userPlanId: string) {
    try {
      await UserPlan.findByIdAndDelete(userPlanId);

      return true;
    } catch (err) {
      console.error("PaymentServiceError: couldn't delete payment, ", err);
    }
  }
}
