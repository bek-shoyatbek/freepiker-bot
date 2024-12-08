import {IUser} from "../../../models/user.model";
import {localize} from "../../locales/localize";
import {IPlan} from "../../../models/plan.model";
import {getUserPlans} from "./get-user-plans.helper";

export async function validateUserAccess(user: IUser): Promise<{ canProceed: boolean; message: string }> {
    const hasFreeTrial = user.freeTrialCount > 0;
    const userPlans = await getUserPlans(user._id as string);

    // No active plan and no free trial
    if (!userPlans.length && !hasFreeTrial) {
        return {
            canProceed: false,
            message: localize("freeTrialAlreadyUsed", "en") // Replace with actual language
        };
    }

    // Check plan limits if user has an active plan
    if (userPlans.length) {
        const plan = userPlans[userPlans.length - 1].planId as unknown as IPlan;
        if (user.dailyRequestsCount >= plan.dailyRequestCount) {
            return {
                canProceed: false,
                message: "You have reached your daily request limit. Please try again tomorrow or upgrade your plan."
            };
        }
    }

    return {canProceed: true, message: ''};
}