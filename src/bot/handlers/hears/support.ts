import { MyContext } from "../../../types/context";

export const supportHandler = async (ctx: MyContext) => {
  await ctx.reply(
    "If you need any help, please contact our support team at support@example.com"
  );
};
