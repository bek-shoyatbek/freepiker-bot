import configs from "../../../configs";
import { generateGroupNotificationMessage } from "../../constants/group.messages";
import { Content } from "../../interfaces/content.interface";
import bot from "../..";
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
