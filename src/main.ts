import bot from "./bot";
import { connectDB } from "./utils/database";

async function main() {
  try {
    await connectDB();

    await bot.api.setMyCommands([
      { command: "/start", description: "Start bot" },
      { command: "/stop", description: "Stop bot" },
      { command: "/language", description: "Set language" },
    ]);

    const botInfo = await bot.api.getMe();
    console.log(`Bot info: ${botInfo.first_name} (@${botInfo.username})`);

    await bot.start({
      onStart: (botInfo: any) => {
        console.log(`Bot @${botInfo.username} started!`);
      },
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: true,
    });

    console.log("Bot started!");
    await bot.start();
  } catch (err) {
    console.error("StartupError: ", err);
  }
}

(async () => {
  await main();
})();
