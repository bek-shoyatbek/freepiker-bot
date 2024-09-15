import { MyContext } from "../../../types/context";

export const cancelPurchaseHandler = async (ctx: MyContext) => {
  await ctx.editMessageText(
    "Purchase cancelled. Use the main menu to see options again."
  );
  await ctx.answerCallbackQuery();
};
