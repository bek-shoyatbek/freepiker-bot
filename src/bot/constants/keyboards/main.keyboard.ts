import { Keyboard } from "grammy";

// Main menu keyboard
export const MAIN_MANU_KEYBOARD = new Keyboard()
  .text("📊 View Plans")
  .text("💳 My Subscription")
  .row()
  .text("📞 Support")
  .text("ℹ️ About Us")
  .resized();
