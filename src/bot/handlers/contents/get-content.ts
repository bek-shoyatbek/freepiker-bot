import { RapidapiService } from "../../../services/rapidapi/rapidapi.service";
import { Content } from "../../interfaces/content.interface";
import { localize } from "../../locales/localize";
import { MyContext } from "../../types/context";
import { i18n } from "../../locales/i18n";
import { generateGroupNotificationMessage } from "../../generators/notifications/group.notification";
import { ContentNotificationManager } from "../../api/notifications/content-notification.service";

export async function getContentByLinkHandler(ctx: MyContext) {
  const processingMessage = await ctx.reply(
    localize("requestProcessing", ctx.session.lang),
  );

  const linkToDownload = ctx.message?.text;
  if (!linkToDownload) {
    return ctx.reply(localize("inlivalidLink", ctx.session.lang));
  }

  const rapidapi = new RapidapiService();
  const { downloadLink, filename } =
    await rapidapi.getDownloadLink(linkToDownload);

  if (!downloadLink) {
    return ctx.reply(
      localize("onlyFreepikPremiumContentAllowed", ctx.session.lang),
    );
  }

  const message = i18n[ctx.session.lang].readyToDownload(downloadLink);

  await ctx.api.editMessageText(
    processingMessage.chat.id,
    processingMessage.message_id,
    message,
    { parse_mode: "HTML" },
  );

  const content: Content = {
    pageLink: linkToDownload,
    downloadLink,
    filename,
  };

  const notificationMessage = generateGroupNotificationMessage(
    content,
    message +
      `


From : ${ctx.from?.username || ctx.from?.first_name}`,
  );

  await ContentNotificationManager.sendGroupNotificationMessage(
    notificationMessage,
  );

  return;
}
