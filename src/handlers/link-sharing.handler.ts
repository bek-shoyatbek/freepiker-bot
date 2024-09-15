import { Context } from "grammy";
import { RapidapiService } from "../downloaders/rapidapi/rapidapi.service";
import {
  generateDownloadLinkMessage,
  PROCESSING,
} from "../constants/reply-messages";
import {
  CONTENT_NOT_FOUND,
  DOWNLOAD_INVALID,
} from "../constants/error-messages";
import { sendGroupNotificationMessage } from "../helpers/api/send-group-notification-message";
import { Content } from "../interfaces/content.interface";

export async function handleLinkSharing(ctx: Context) {
  const processingMessage = await ctx.reply(PROCESSING);

  const linkToDownload = ctx.message?.text;
  if (!linkToDownload) {
    return ctx.reply(DOWNLOAD_INVALID);
  }

  const rapidapi = new RapidapiService();
  const { downloadLink, filename } = await rapidapi.getDownloadLink(
    linkToDownload
  );

  if (!downloadLink) {
    return ctx.reply(CONTENT_NOT_FOUND);
  }

  const message = generateDownloadLinkMessage(downloadLink);

  await ctx.api.editMessageText(
    processingMessage.chat.id,
    processingMessage.message_id,
    message,
    { parse_mode: "HTML" }
  );

  const content: Content = { pageLink: linkToDownload, downloadLink, filename };
  await sendGroupNotificationMessage(content, message);
  return;
}
