import { Keyboard } from "grammy";
import { localize } from "../../locales/localize";

export const generateMainKeyboard = (lang: "uz" | "en" | "ru") => {
  const viewPlansText = localize("viewTariffs", lang);
  const supportText = localize("help", lang);
  const mySubsText = localize("mySubscription", lang);
  const aboutText = localize("aboutUs", lang);
  return new Keyboard()
    .text(viewPlansText)
    .text(supportText)
    .row()
    .text(mySubsText)
    .text(aboutText)
    .resized()
    .oneTime(true);
};


