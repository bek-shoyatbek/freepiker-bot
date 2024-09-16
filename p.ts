



const { Bot, session, Keyboard } = require('grammy');
const { conversations, createConversation } = require('@grammyjs/conversations');

// Import the localization module we created earlier
const { localize, i18n } = require('./localization');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new Bot('YOUR_BOT_TOKEN');

// Use session to store user data
bot.use(session({
  initial: () => ({ language: null })
}));

// Use the conversations plugin
bot.use(conversations());

// Helper function to create keyboard
function createKeyboard(keys, lang) {
  return new Keyboard(keys.map(key => [localize(key, lang)]));
}

// Language selection conversation
async function languageSelection(conversation, ctx) {
  await ctx.reply("🌐 Please select your language / Iltimos, tilingizni tanlang / Пожалуйста, выберите ваш язык:", {
    reply_markup: new Keyboard().text("English").text("O'zbek").text("Русский")
  });

  const { message } = await conversation.wait();
  
  switch (message.text) {
    case "English":
      ctx.session.language = "en";
      break;
    case "O'zbek":
      ctx.session.language = "uz";
      break;
    case "Русский":
      ctx.session.language = "ru";
      break;
    default:
      ctx.session.language = "en"; // Default to English
  }

  await ctx.reply(localize('welcome', ctx.session.language));
  await showMainMenu(ctx);
}

// Main menu function
async function showMainMenu(ctx) {
  const lang = ctx.session.language;
  await ctx.reply(localize('chooseOption', lang), {
    reply_markup: createKeyboard(['viewTariffs', 'mySubscription', 'help', 'aboutUs'], lang)
  });
}

// Register the language selection conversation
bot.use(createConversation(languageSelection));

// Start command handler
bot.command('start', async (ctx) => {
  // If language is not set, start language selection conversation
  if (!ctx.session.language) {
    await ctx.conversation.enter('languageSelection');
  } else {
    await ctx.reply(localize('welcome', ctx.session.language));
    await showMainMenu(ctx);
  }
});

// Handle button clicks
bot.on('message:text', async (ctx) => {
  const lang = ctx.session.language;
  const text = ctx.message.text;

  if (text === localize('viewTariffs', lang)) {
    await ctx.reply(localize('chooseTariff', lang));
    const tariffs = ['basic', 'standard', 'premium'];
    for (const tariff of tariffs) {
      await ctx.reply(
        `${localize(`${tariff}.name`, lang)} - ${localize(`${tariff}.price`, lang)}\n` +
        `${localize(`${tariff}.description`, lang)}` +
        (tariff === 'standard' ? ` ${localize(`${tariff}.mostPreferred`, lang)}` : '')
      );
    }
    // Add buttons for selecting tariffs
    await ctx.reply(localize('chooseTariff', lang), {
      reply_markup: createKeyboard(['basic', 'standard', 'premium'], lang)
    });
  } else if (text === localize('mySubscription', lang)) {
    await ctx.reply(localize('mySubscription', lang) + "\n(Subscription details would be shown here)");
  } else if (text === localize('help', lang)) {
    await ctx.reply(localize('help', lang) + "\n(Help information would be provided here)");
  } else if (text === localize('aboutUs', lang)) {
    await ctx.reply(localize('aboutUs', lang) + "\n(Information about your service would be shown here)");
  } else if (['BASIC', 'STANDARD', 'PREMIUM'].includes(text.toUpperCase())) {
    const tariff = text.toLowerCase();
    await ctx.reply(
      localize('tariffConfirmation', lang, { tariff: localize(`${tariff}.name`, lang) }) + '\n' +
      localize('price', lang, { price: localize(`${tariff}.price`, lang) }) + '\n' +
      localize('dailyDownload', lang, { count: tariff === 'basic' ? 5 : (tariff === 'standard' ? 10 : 20) }) + '\n' +
      localize('continueSubscription', lang),
      {
        reply_markup: createKeyboard(['yes', 'reject'], lang)
      }
    );
  } else if (text === localize('yes', lang)) {
    await ctx.reply(localize('sendPaymentCheck', lang));
  } else if (text === localize('reject', lang)) {
    await showMainMenu(ctx);
  } else {
    await ctx.reply(localize('chooseOption', lang));
    await showMainMenu(ctx);
  }
});

// Handle file uploads (for payment checks)
bot.on(':file', async (ctx) => {
  const lang = ctx.session.language;
  await ctx.reply(localize('paymentProcessing', lang));
  // Here you would process the payment check
  // For this example, we'll just confirm it immediately
  setTimeout(async () => {
    await ctx.reply(localize('paymentConfirmed', lang));
    await ctx.reply(localize('resourceReady', lang));
    await ctx.reply(localize('downloadLink', lang));
    await ctx.reply(localize('clickToDownload', lang) + ' (https://example.com/download)');
    await ctx.reply(localize('congratulations', lang));
  }, 3000); // Simulate processing delay
});

// Start the bot
bot.start();