import { IPlan } from "../../models/plan.model";

export interface Translator {
  getMainMenuText(): string;

  getPlansText(plans: IPlan[]): string;

  getPlanConfirmationText(plan: IPlan): string;

  askForPaymentCheck(): string;

  getPaymentProcessingMessage(): string;

  getPaymentSuccessMessage(): string;

  getPaymentFailedMessage(): string;

  getContentReadyMessage(downloadLink: string): string;
}
