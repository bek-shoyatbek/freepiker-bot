import { app } from "./api";
import bot from "./bot";
import configs from "./configs";
import { connectDB } from "./utils/database";

async function main() {
  try {
    await connectDB();

    // Api started
    app.listen(configs.PORT, () => {
      console.log("Api server is running on port: ", configs.PORT);
    });

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
  } catch (err) {
    console.error("StartupError: ", err);
  }
}

(async () => {
  await main();
})();
