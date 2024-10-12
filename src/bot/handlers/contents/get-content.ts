import { RapidapiService } from "../../../services/rapidapi/rapidapi.service";
import { Content } from "../../interfaces/content.interface";
import { localize } from "../../locales/localize";
import { MyContext } from "../../types/context";
import { i18n } from "../../locales/i18n";
import { generateGroupNotificationMessage } from "../../generators/notifications/group.notification";
import { ContentNotificationManager } from "../../api/notifications/content-notification.service";
import { freepikService } from "../../../services/freepik-api";
import { isFreepikProvider } from "../../../utils/provider";

export async function getContentByLinkHandler(ctx: MyContext) {
  const processingMessage = await ctx.reply(
    localize("requestProcessing", ctx.session.lang),
  );

  const linkToDownload = ctx.message?.text;
  console.log(
    `from: ${ctx.from?.username || ctx.from?.first_name} \ndownloadLink: ${linkToDownload}`,
  );

  if (!linkToDownload) {
    return ctx.reply(localize("inlivalidLink", ctx.session.lang));
  }

  let downloadLink: string;
  let filename: string;

  if (isFreepikProvider()) {
    const resourceId = freepikService.extractResourceId(linkToDownload);

    if (!resourceId) {
      return ctx.reply(
        localize("onlyFreepikPremiumContentAllowed", ctx.session.lang),
      );
    }

    const resource = await freepikService.downloadResource(resourceId);

    downloadLink = resource.downloadLink;
    filename = resource.filename;
  } else {
    const rapidapi = new RapidapiService();
    const resource =
      await rapidapi.getDownloadLink(linkToDownload);

    downloadLink = resource.downloadLink;
    filename = resource.filename;
  }

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
