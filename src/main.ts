import { Bot, session } from "grammy";
import configs from "./configs";
import { verifyToken } from "./helpers/verify-token";
import { handleLinkSharing } from "./handlers/link-sharing.handler";
import { MyContext } from "./types/context";
import { initialSession } from "./helpers/sessions";
import { handleStart } from "./handlers/start.handler";

function main(): void {
  const botToken = verifyToken(configs.BOT_TOKEN);

  const bot = new Bot<MyContext>(botToken);

  bot.use(session({ initial: initialSession }));

  // Command handler for /start
  bot.command("start", handleStart);

  // Command handler for /subscribe
  bot.command("subscribe", async (ctx) => {
    // Here you would implement the subscription logic
    // For now, we'll just set the subscribed status to true
    ctx.session.subscribed = true;
    await ctx.reply(
      "You've successfully subscribed to the premium content service!"
    );
  });

  bot.on("::url", handleLinkSharing);

  bot.start();
}

main();
