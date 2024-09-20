import { Keyboard } from "grammy";
import { localize } from "../../locales/localize";
import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { ENG, RU, UZ } from "../countries";
import { i18n } from "../../locales/i18n";

// Main menu keyboard
export const generateMainKeyboard = (lang: "uz" | "en" | "ru") => {
  const viewPlansText = localize("viewTariffs", lang);
  const supportText = localize("help", lang);
  const mySubsText = localize("mySubscription", lang);
  const aboutText = localize("aboutUs", lang);
  return new Keyboard()
    .text(viewPlansText)
    .text(supportText)
    .row()
    .text(mySubsText)
    .text(aboutText)
    .resized()
    .oneTime(true);
};

// Language selection menu
export const languageMenu = new Menu<MyContext>("language")
  .text(UZ, async (ctx) => {
    const onStart = ctx.session.onStart;
    const isNewUser = ctx.session.isNewUser;
    ctx.session.lang = "uz";

    if (onStart) {
      if (isNewUser) {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithNewUser(ctx.from!.first_name)
        );
      } else {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithOldUser(ctx.from!.first_name)
        );
      }
    }

    await showMainMenu(ctx);
    return ctx.menu.close();
  })
  .text(ENG, async (ctx) => {
    const onStart = ctx.session.onStart;
    const isNewUser = ctx.session.isNewUser;
    ctx.session.lang = "en";

    if (onStart) {
      if (isNewUser) {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithNewUser(ctx.from!.first_name)
        );
      } else {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithOldUser(ctx.from!.first_name)
        );
      }
    }

    await showMainMenu(ctx);
    return ctx.menu.close();
  })
  .text(RU, async (ctx) => {
    const onStart = ctx.session.onStart;
    const isNewUser = ctx.session.isNewUser;
    ctx.session.lang = "ru";

    if (onStart) {
      if (isNewUser) {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithNewUser(ctx.from!.first_name)
        );
      } else {
        await ctx.reply(
          i18n[ctx.session.lang].greetWithOldUser(ctx.from!.first_name)
        );
      }
    }

    await showMainMenu(ctx);
    return ctx.menu.close();
  });

export async function showMainMenu(ctx: MyContext) {
  await ctx.reply("Menu", {
    reply_markup: generateMainKeyboard(ctx.session.lang),
  });
}
