export interface Notification {
  sendGroupNotificationMessage(message: string): Promise<void>;
}
