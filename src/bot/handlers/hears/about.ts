import { MyContext } from "../../../types/context";
import { localize } from "../../locales/localize";

export const aboutHandler = async (ctx: MyContext) => {
  console.log("On /about command");
  await ctx.reply(localize("aboutUs", ctx.session.lang));
};
