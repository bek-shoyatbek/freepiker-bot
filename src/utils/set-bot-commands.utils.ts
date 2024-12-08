import bot from "../bot";

export const
    setBotCommands = async () => {
        await bot.api.setMyCommands([
            {command: "/start", description: "Start bot"},
            {command: "/stop", description: "Stop bot"},
            {command: "/language", description: "Set language"},
            {command: "/referal", description: "Get referal link"},
        ]);
    }