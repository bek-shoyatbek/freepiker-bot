import { MiddlewareFn } from "grammy";
import { localize } from "../locales/localize";
import { MyContext } from "../../types/context";

const freepikPremiumFilter: MiddlewareFn<MyContext> = async (
  ctx: MyContext,
  next
) => {
  const messageText = ctx.message?.text;

  if (messageText) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = messageText.match(urlRegex);

    if (urls) {
      const isValidUrl = urls.every((url) => {
        const freepikPremiumRegex = /^https:\/\/www\.freepik\.com\/premium-.*$/;
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

export default freepikPremiumFilter;
