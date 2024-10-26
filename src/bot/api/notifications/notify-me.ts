import bot from "../..";
import configs from "../../../configs";

export class NotifyMe {
  static async sendMessage(message: string): Promise<void> {
    try {
      await bot.api.sendMessage(configs.ADMIN_CHAT_ID as string, message, {
        parse_mode: "HTML",
      });
    } catch (err) {
      console.error("Error while notifiying you: ", err);
    }
  }
}
