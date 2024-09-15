import { MyContext } from "../types/context";

export async function handleStart(ctx: MyContext) {
  await ctx.reply(
    "Welcome to the Freepik Premium Content Bot! Use /subscribe to get started."
  );
}
