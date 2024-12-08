import {IUser} from "../../../models/user.model";

export async function handleDailyReset(user: IUser) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user?.lastResetDate < today) {
        user.dailyRequestsCount = 0;
        user.lastResetDate = today;
        await user.save();
    }
}