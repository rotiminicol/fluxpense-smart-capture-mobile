
import { dataApi } from '@/lib/api';
import { PaymentMethod } from '@/types/api';

export const paymentMethodService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return dataApi.get<PaymentMethod[]>('payment_method');
  },

  async getPaymentMethod(id: number): Promise<PaymentMethod> {
    return dataApi.get<PaymentMethod>(`payment_method/${id}`);
  },

  async createPaymentMethod(paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return dataApi.post<PaymentMethod>('payment_method', paymentMethod);
  },

  async updatePaymentMethod(id: number, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return dataApi.patch<PaymentMethod>(`payment_method/${id}`, paymentMethod);
  },

  async deletePaymentMethod(id: number): Promise<void> {
    return dataApi.delete<void>(`payment_method/${id}`);
  },
};
