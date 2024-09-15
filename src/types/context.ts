import { Context, SessionFlavor } from "grammy";

// Define the structure for the session data
export interface SessionData {
  pendingPlan?: string;
  subscribed?: boolean;
  // Add more session data as needed
}
export type MyContext = Context & SessionFlavor<SessionData>;
