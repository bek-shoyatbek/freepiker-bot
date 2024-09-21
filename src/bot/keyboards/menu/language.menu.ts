import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { ENG, RU, UZ } from "../../constants/countries";
import { i18n } from "../../locales/i18n";
import { showMainMenu } from "./main.menu";

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
