import { MyContext } from "../../../types/context";

export const aboutHandler = async (ctx: MyContext) => {
  await ctx.reply(
    "We are a company dedicated to providing excellent service. Learn more at www.example.com"
  );
};
