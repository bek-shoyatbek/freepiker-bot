import bot from "../..";

export class MarketingNotificationManager {
  static sendMarketingNotification(message: string, userIds: number[]) {
    try {
      // TODO: implement
      userIds.forEach(async (id) => {
        await bot.api.sendMessage(id, message, {
          parse_mode: "HTML",
        });
      });
    } catch (err) {
      console.error("Error while sending marketing message: ", err);
    }
  }
}
