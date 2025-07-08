
import { dataApi } from '@/lib/api';
import { Transaction } from '@/types/api';

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    return dataApi.get<Transaction[]>('transaction');
  },

  async getTransaction(id: number): Promise<Transaction> {
    return dataApi.get<Transaction>(`transaction/${id}`);
  },

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    return dataApi.post<Transaction>('transaction', transaction);
  },

  async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    return dataApi.patch<Transaction>(`transaction/${id}`, transaction);
  },

  async deleteTransaction(id: number): Promise<void> {
    return dataApi.delete<void>(`transaction/${id}`);
  },
};
