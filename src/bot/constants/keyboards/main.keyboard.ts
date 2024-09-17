import { Keyboard } from "grammy";
import { localize } from "../../locales/localize";
import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../../types/context";

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
    .oneTime()
    .resized();
};

// Language selection menu
export const languageMenu = new Menu<MyContext>("language")
  .text("English", async (ctx) => {
    ctx.session.lang = "en";
    const oldUser = ctx.session.subscribed;
    ctx.reply(localize(oldUser ? "welcomeBack" : "welcome", ctx.session.lang));
    return ctx.menu.close();
  })
  .text("O'zbek", async (ctx) => {
    ctx.session.lang = "uz";
    const oldUser = ctx.session.subscribed;
    await ctx.reply(
      localize(oldUser ? "welcomeBack" : "welcome", ctx.session.lang)
    );
    return ctx.menu.close();
  })
  .text("Русский", async (ctx) => {
    ctx.session.lang = "ru";
    const oldUser = ctx.session.subscribed;
    ctx.reply(localize(oldUser ? "welcomeBack" : "welcome", ctx.session.lang));
    return ctx.menu.close();
  });

export async function showMainMenu(ctx: MyContext) {
  await ctx.reply(localize("chooseOption", ctx.session.lang), {
    reply_markup: generateMainKeyboard(ctx.session.lang),
  });
}
