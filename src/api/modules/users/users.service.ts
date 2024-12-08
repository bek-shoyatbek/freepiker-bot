import {Payment} from "../../../models/payment.model";
import {UserPlan} from "../../../models/user-plan.model";
import {IUser, User} from "../../../models/user.model";

export class UserService {
  static async getAll(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (err) {
      console.error("UserServiceError: couldn't get users, ", err);
      throw new Error();
    }
  }

  static async getUserDetailsById(userId: string) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      const userPayments = await Payment.find({ userId: user?._id });
      const userPlans = await UserPlan.find({ userId: user?._id });
      console.log("userPlans: ", userPlans);
      const userDetails = {
        user: user,
        payments: userPayments,
        plans: userPlans,
      };

      return userDetails;
    } catch (err) {
      console.error("UserServiceError: ", err);
      throw new Error();
    }
  }
}
