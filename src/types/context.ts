import { Context, SessionFlavor } from "grammy";
import { I18nFlavor } from "@grammyjs/i18n";

// Define the structure for the session data
export interface SessionData {
  pendingPlan?: string;
  subscribed?: boolean;
  lang: "uz" | "en" | "ru";
  // Add more session data as needed
}
export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;
