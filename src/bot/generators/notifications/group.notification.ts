import configs from "../../../configs";
import { Content } from "../../interfaces/content.interface";
import { generateHashTagFromFilename } from "../hashtag.generator";

export function generateGroupNotificationMessage(
  content: Content,
  message?: string
) {
  const fullText = `
       Page link: <a href="${content.pageLink}">Link</a>

${generateHashTagFromFilename(content.filename)}
       
Our bot: ${configs.BOT_USERNAME}
Our free content: ${configs.GROUP_USERNAME}
      `;

  return fullText;
}
