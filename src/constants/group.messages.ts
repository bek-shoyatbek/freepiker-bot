import configs from "../configs";
import { Content } from "../interfaces/content.interface";

export function generateGroupNotificationMessage(
  content: Content,
  message: string
) {
  const fullText = `
     Page link: <a> href=${content.pageLink}</a>
     ${message}
     ${generateSearchParamsFromFilename(content.filename)}
     
Our bot: ${configs.BOT_USERNAME}
Our free content: ${configs.GROUP_USERNAME}
    `;

  return fullText;
}

function generateSearchParamsFromFilename(filename: string) {
  const searchParams = filename.split("-").map((param) => `#${param} `);
  searchParams.pop();
  return searchParams.join("");
}
