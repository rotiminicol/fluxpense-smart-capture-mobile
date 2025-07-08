
import { dataApi } from '@/lib/api';
import { Notification } from '@/types/api';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return dataApi.get<Notification[]>('notification');
  },

  async getNotification(id: number): Promise<Notification> {
    return dataApi.get<Notification>(`notification/${id}`);
  },

  async createNotification(notification: Partial<Notification>): Promise<Notification> {
    return dataApi.post<Notification>('notification', notification);
  },

  async updateNotification(id: number, notification: Partial<Notification>): Promise<Notification> {
    return dataApi.patch<Notification>(`notification/${id}`, notification);
  },

  async deleteNotification(id: number): Promise<void> {
    return dataApi.delete<void>(`notification/${id}`);
  },

  async markAsRead(id: number): Promise<Notification> {
    return this.updateNotification(id, { is_read: true });
  },
};
