import { MiddlewareFn } from "grammy";
import { localize } from "../locales/localize";
import { MyContext } from "../types/context";

export const freepikPremiumFilter: MiddlewareFn<MyContext> = async (
  ctx: MyContext,
  next
) => {
  const messageText = ctx.message?.text;

  if (messageText) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = messageText.match(urlRegex);

    if (urls) {
      const isValidUrl = urls.every((url) => {
        const freepikPremiumRegex =
          /^https?:\/\/(?:[\w-]+\.)*freepik\.(?:\w{2,3})(?:\.\w{2,3})?\/.*premium.*/i;
        return freepikPremiumRegex.test(url);
      });

      if (isValidUrl) {
        await next();
      } else {
        await ctx.reply(
          localize("onlyFreepikPremiumContentAllowed", ctx.session.lang)
        );
      }
    } else {
      await next();
    }
  } else {
    await next();
  }
};
