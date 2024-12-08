import {app} from "./api";
import bot from "./bot";
import configs from "./configs";
import {connectDB, setBotCommands} from "./utils";

async function main() {
    try {
        await connectDB();

        // Api started
        app.listen(configs.PORT, () => {
            console.log("Api server is running on port: ", configs.PORT);
        });

        await setBotCommands()
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
