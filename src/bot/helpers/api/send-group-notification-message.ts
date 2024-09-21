import configs from "../../../configs";
import { Content } from "../../interfaces/content.interface";
import bot from "../..";
import { generateGroupNotificationMessage } from "../../generators/notifications/group.notification";
export async function sendGroupNotificationMessage(
  content: Content,
  message: string
) {
  try {
    const notificationMessage = generateGroupNotificationMessage(
      content,
      message
    );
    await bot.api.sendMessage(configs.GROUP_ID as string, notificationMessage, {
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("Error while sending content(s) to group: ", err);
  }
}
