import { Notification } from "./interfaces/notification.interface";

export abstract class NotificationManager implements Notification {
  async sendGroupNotificationMessage(message: string): Promise<void> {}
}
