import { SessionData } from "../../../types/context";

// Set up the session middleware
export function initialSession(): SessionData {
  return {
    lang: "en",
    subscribed: false,
  };
}
