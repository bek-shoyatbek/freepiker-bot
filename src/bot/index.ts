import { Bot, GrammyError, HttpError, MiddlewareFn, session } from "grammy";
import { verifyToken } from "./helpers/validators/verify-token";
import { getContentByLinkHandler } from "./handlers/contents/get-content";
import { initialSession } from "./helpers/sessions";
import { handleStart } from "./handlers/commands/start.handler";
import configs from "../configs";
import { MyContext } from "../types/context";
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
import { conversations } from "@grammyjs/conversations";

const botToken = verifyToken(configs.BOT_TOKEN);

const bot = new Bot<MyContext>(botToken);

// Global error handler
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.use(session({ initial: initialSession }));

bot.use(conversations());

// Command handler for /start
bot.command("start", handleStart);

bot.on("message:photo", getPaymentChequeHandler);

bot.hears("📊 View Plans", viewPlansHandler);

bot.hears("💳 My Subscription", mySubsHandler);

bot.hears("📞 Support", supportHandler);

bot.hears("ℹ️ About Us", aboutHandler);

bot.callbackQuery(/^select_plan:(.+)$/, selectPlanHandler);

bot.callbackQuery("cancel_purchase", cancelPurchaseHandler);

bot.callbackQuery(/^confirm_purchase:(.+)$/, confirmPurchaseHandler);

bot.callbackQuery(/approve_(.+)/, paymentApprovalHandler);

bot.callbackQuery(/reject_(.+)/, paymentRejectionHandler);

bot.on("::url", trackRequest, getContentByLinkHandler);

export default bot;
