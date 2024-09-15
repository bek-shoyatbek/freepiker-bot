import { Bot, Context, session, SessionFlavor } from "grammy";
import configs from "./configs";
import { verifyToken } from "./helpers/verify-token";
import { handleLinkSharing } from "./handlers/link-sharing.handler";

function main(): void {
  const botToken = verifyToken(configs.BOT_TOKEN);

  // Define the structure for the session data
  interface SessionData {
    subscribed: boolean;
    // Add more session data as needed
  }

  type MyContext = Context & SessionFlavor<SessionData>;

  // Set up the session middleware
  function initial(): SessionData {
    return { subscribed: false };
  }

  const bot = new Bot<MyContext>(botToken);

  bot.use(session({ initial }));

  // Command handler for /start
  bot.command("start", async (ctx) => {
    await ctx.reply(
      "Welcome to the Freepik Premium Content Bot! Use /subscribe to get started."
    );
  });

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
