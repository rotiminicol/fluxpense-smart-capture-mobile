
import { dataApi } from '@/lib/api';
import { Category } from '@/types/api';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return dataApi.get<Category[]>('category');
  },

  async getCategory(id: number): Promise<Category> {
    return dataApi.get<Category>(`category/${id}`);
  },

  async createCategory(category: Partial<Category>): Promise<Category> {
    return dataApi.post<Category>('category', category);
  },

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    return dataApi.patch<Category>(`category/${id}`, category);
  },

  async deleteCategory(id: number): Promise<void> {
    return dataApi.delete<void>(`category/${id}`);
  },
};
