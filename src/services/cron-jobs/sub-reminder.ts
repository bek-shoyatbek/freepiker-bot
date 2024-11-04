import cron from 'node-cron';
import { DateTime } from 'luxon';
import { UserPlan } from '../../models/user-plan.model';
import { IUser } from '../../models/user.model';
import { IPlan } from '../../models/plan.model';
import bot from '../../bot';

interface ReminderUser {
    telegramId: string;
    name: string;
    planTitle: string;
    endDate: Date;
    daysLeft: number;
}

class SubscriptionReminderService {
    private async findUsersToRemind(daysThreshold: number): Promise<ReminderUser[]> {
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysThreshold);

        // Find active subscriptions that will expire in exactly 3 or 5 days
        const targetDateStart = new Date(targetDate);
        targetDateStart.setHours(0, 0, 0, 0);
        const targetDateEnd = new Date(targetDate);
        targetDateEnd.setHours(23, 59, 59, 999);

        const expiringPlans = await UserPlan.find({
            status: 'active',
            endDate: {
                $gte: targetDateStart,
                $lte: targetDateEnd
            }
        }).populate('userId planId');

        return expiringPlans.map(plan => ({
            telegramId: (plan.userId as unknown as IUser).telegramId,
            name: (plan.userId as unknown as IUser).name,
            planTitle: (plan.planId as unknown as IPlan).title,
            endDate: plan.endDate,
            daysLeft: daysThreshold
        }));
    }

    private async sendReminder(user: ReminderUser): Promise<void> {
        const message = `
Hello ${user.name}! 👋

Your subscription reminder:
🎯 Plan: ${user.planTitle}
⏳ Days left: ${user.daysLeft}
📅 Expires on: ${DateTime.fromJSDate(user.endDate).toFormat('dd/MM/yyyy')}

To renew your subscription, please use the /subscribe command.`;

        try {
            await bot.api.sendMessage(user.telegramId, message);
            console.log(`Reminder sent to user ${user.telegramId}`);
        } catch (error) {
            console.error(`Failed to send reminder to user ${user.telegramId}:`, error);
        }
    }

    async processReminders(): Promise<void> {
        try {
            // Find users to remind for both 5 and 3 days
            const fiveDayReminders = await this.findUsersToRemind(5);
            const threeDayReminders = await this.findUsersToRemind(3);

            // Send reminders
            const allReminders = [...fiveDayReminders, ...threeDayReminders];
            for (const reminder of allReminders) {
                await this.sendReminder(reminder);
            }

            console.log(`Processed ${allReminders.length} reminders`);
        } catch (error) {
            console.error('Error processing reminders:', error);
        }
    }

    startCronJob(): void {
        // Run every day at 10:00 AM
        cron.schedule('0 10 * * *', async () => {
            console.log('Running subscription reminder cron job...');
            await this.processReminders();
        });
    }
}

// Create and export the service instance
export const subscriptionReminderService = new SubscriptionReminderService();