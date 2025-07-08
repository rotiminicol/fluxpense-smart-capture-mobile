
import { dataApi } from '@/lib/api';
import { Budget } from '@/types/api';

export const budgetService = {
  async getBudgets(): Promise<Budget[]> {
    return dataApi.get<Budget[]>('budget');
  },

  async getBudget(id: number): Promise<Budget> {
    return dataApi.get<Budget>(`budget/${id}`);
  },

  async createBudget(budget: Partial<Budget>): Promise<Budget> {
    return dataApi.post<Budget>('budget', budget);
  },

  async updateBudget(id: number, budget: Partial<Budget>): Promise<Budget> {
    return dataApi.patch<Budget>(`budget/${id}`, budget);
  },

  async deleteBudget(id: number): Promise<void> {
    return dataApi.delete<void>(`budget/${id}`);
  },
};
