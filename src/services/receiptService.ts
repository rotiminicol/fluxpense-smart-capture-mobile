
import { dataApi, API_CONFIG } from '@/lib/api';
import { Receipt } from '@/types/api';

export const receiptService = {
  async getReceipts(): Promise<Receipt[]> {
    return dataApi.get<Receipt[]>('receipt');
  },

  async getReceipt(id: number): Promise<Receipt> {
    return dataApi.get<Receipt>(`receipt/${id}`);
  },

  async createReceipt(receipt: Partial<Receipt>): Promise<Receipt> {
    return dataApi.post<Receipt>('receipt', receipt);
  },

  async updateReceipt(id: number, receipt: Partial<Receipt>): Promise<Receipt> {
    return dataApi.patch<Receipt>(`receipt/${id}`, receipt);
  },

  async deleteReceipt(id: number): Promise<void> {
    return dataApi.delete<void>(`receipt/${id}`);
  },

  async processReceiptWithMindee(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append('document', imageFile);

    try {
      const response = await fetch('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${API_CONFIG.MINDEE_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Mindee API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Receipt processing failed:', error);
      throw error;
    }
  },
};
