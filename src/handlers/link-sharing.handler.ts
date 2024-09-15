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

export async function handleLinkSharing(ctx: Context) {
  const processingMessage = await ctx.reply(PROCESSING);

  const linkToDownload = ctx.message?.text;
  if (!linkToDownload) {
    return ctx.reply(DOWNLOAD_INVALID);
  }

  const rapidapi = new RapidapiService();
  const downloadLink = await rapidapi.getDownloadLink(linkToDownload);

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
  return;
}
