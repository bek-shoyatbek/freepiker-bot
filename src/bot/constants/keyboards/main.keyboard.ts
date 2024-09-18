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
    .resized()
    .oneTime(true);
};

// Language selection menu
export const languageMenu = new Menu<MyContext>("language")
  .text("English", async (ctx) => {
    ctx.session.lang = "en";
    await showMainMenu(ctx);
    return ctx.menu.close();
  })
  .text("O'zbek", async (ctx) => {
    ctx.session.lang = "uz";
    await showMainMenu(ctx);
    return ctx.menu.close();
  })
  .text("Русский", async (ctx) => {
    ctx.session.lang = "ru";
    await showMainMenu(ctx);
    return ctx.menu.close();
  });

export async function showMainMenu(ctx: MyContext) {
  await ctx.reply(localize("chooseOption", ctx.session.lang), {
    reply_markup: generateMainKeyboard(ctx.session.lang),
  });
}
