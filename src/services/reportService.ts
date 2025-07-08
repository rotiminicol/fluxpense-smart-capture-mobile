import { dataApi } from '@/lib/api';
import { Report } from '@/types/api';

export const reportService = {
  async getReports(): Promise<Report[]> {
    return dataApi.get<Report[]>('report');
  },
  async getReport(id: number): Promise<Report> {
    return dataApi.get<Report>(`report/${id}`);
  },
}; 