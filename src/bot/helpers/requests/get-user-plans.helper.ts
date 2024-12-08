import {UserPlan} from "../../../models/user-plan.model";

export async function getUserPlans(userId: string) {
    return UserPlan.find({
        userId,
        status: "active",
    }).populate("planId");
}