import { Bot, session } from "grammy";
import { verifyToken } from "./helpers/validators/verify-token";
import { getContentByLinkHandler } from "./handlers/contents/get-content";
import { initialSession } from "./helpers/sessions";
import { handleStart } from "./handlers/commands/start.command";
import configs from "../configs";
import { MyContext } from "./types/context";
import { getPaymentChequeHandler } from "./handlers/payment/cheque.handler";
import { paymentApprovalHandler } from "./handlers/payment/approval.handler";
import { paymentRejectionHandler } from "./handlers/payment/reject.handler";
import { mySubsHandler } from "./handlers/hears/my-subs";
import { viewPlansHandler } from "./handlers/hears/view-plans";
import { supportHandler } from "./handlers/hears/support";
import { aboutHandler } from "./handlers/hears/about";
import { selectPlanHandler } from "./handlers/callbacks/select-plan";
import { cancelPurchaseHandler } from "./handlers/callbacks/cancel-purchase";
import { confirmPurchaseHandler } from "./handlers/callbacks/confirm-purchase";
import { trackRequest } from "./middlewares/request-counter.middleware";
import { localize } from "./locales/localize";
import {
  changeLanguageHandler,
  showLanguageMenu,
} from "./handlers/commands/language.command";
import { catchGlobalBotErrors } from "./helpers/errors/global-error.handler";
import { freepikPremiumFilter } from "./middlewares/url-filter.middleware";
import { languageMenu } from "./generators/keyboards/menu/language.menu";
import { saveUsernameIfDoesExist } from "./middlewares/save-username.middleware";
import { checkPlanExpiry } from "./middlewares/check-plan-expiry.middleware";

const botToken = verifyToken(configs.BOT_TOKEN);

const bot = new Bot<MyContext>(botToken);

// Global error handler
catchGlobalBotErrors(bot);

bot.use(session({ initial: initialSession }));

bot.use(languageMenu);
bot.use(saveUsernameIfDoesExist);

// Command handler for /start
bot.command("start", handleStart);

bot.command("language", async (ctx) => {
  await showLanguageMenu(ctx);
});

bot.on("message:photo", getPaymentChequeHandler);

// Handle button clicks with localization
bot.filter(
  (ctx) => ctx.message?.text === localize("viewTariffs", ctx.session.lang),
  viewPlansHandler,
);
bot.filter(
  (ctx) => ctx.message?.text === localize("mySubscription", ctx.session.lang),
  mySubsHandler,
);
bot.filter(
  (ctx) => ctx.message?.text === localize("help", ctx.session.lang),
  supportHandler,
);
bot.filter(
  (ctx) => ctx.message?.text === localize("aboutUs", ctx.session.lang),
  aboutHandler,
);

// Handle language selection
bot.filter(
  (ctx) =>
    ["English 🇬🇧", "O'zbek 🇺🇿", "Русский 🇷🇺"].includes(ctx.message?.text || ""),
  changeLanguageHandler,
);

bot.callbackQuery(/^select_plan:(.+)$/, selectPlanHandler);

bot.callbackQuery("cancel_purchase", cancelPurchaseHandler);

bot.callbackQuery(/^confirm_purchase:(.+)$/, confirmPurchaseHandler);

bot.callbackQuery(/approve_(.+)/, paymentApprovalHandler);

bot.callbackQuery(/reject_(.+)/, paymentRejectionHandler);

bot.on(
  "::url",
  freepikPremiumFilter,
  checkPlanExpiry,
  trackRequest,
  getContentByLinkHandler,
);

export default bot;
