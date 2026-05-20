import api from './api';
import { DashboardItem } from '../models';

export const dashboardApi = {
  getDashboard: async (
    consultant?: string,
  ): Promise<DashboardItem[]> => {
    const params = consultant ? { consultant } : {};
    const response = await api.get<DashboardItem[]>('/dashboard', {
      params,
    });
    return response.data;
  },
};
