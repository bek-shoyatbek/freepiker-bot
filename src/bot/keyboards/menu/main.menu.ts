import { MyContext } from "../../types/context";
import { generateMainKeyboard } from "../main.keyboard";

export async function showMainMenu(ctx: MyContext) {
  await ctx.reply("Menu", {
    reply_markup: generateMainKeyboard(ctx.session.lang),
  });
}
