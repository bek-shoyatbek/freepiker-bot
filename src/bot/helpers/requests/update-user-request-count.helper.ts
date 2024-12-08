import {IUser} from "../../../models/user.model";

export async function updateUserRequestCount(user: IUser) {
    const hasFreeTrial = user.freeTrialCount > 0;

    if (hasFreeTrial) {
        user.freeTrialCount -= 1;
    }

    user.dailyRequestsCount += 1;
    await user.save();
}