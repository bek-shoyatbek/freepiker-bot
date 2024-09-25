import bot from "../..";
import configs from "../../../configs";
import { NotificationManager } from "./notification.service";

export class ContentNotificationManager extends NotificationManager {
  static async sendGroupNotificationMessage(message: string): Promise<void> {
    try {
      await bot.api.sendMessage(configs.GROUP_ID as string, message, {
        parse_mode: "HTML",
      });
    } catch (err) {
      console.error("Error while sending content(s) to group: ", err);
    }
  }
}
