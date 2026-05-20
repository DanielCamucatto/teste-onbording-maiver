import { useState, useCallback } from 'react';
import { DashboardItem } from '../models';
import { dashboardApi } from '../services/dashboard.api';

interface UseDashboardReturn {
  dashboardData: DashboardItem[];
  loading: boolean;
  error: string | null;
  fetchDashboard: (consultant?: string) => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [dashboardData, setDashboardData] = useState<DashboardItem[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(
    async (consultant?: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await dashboardApi.getDashboard(consultant);
        setDashboardData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao carregar dashboard',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { dashboardData, loading, error, fetchDashboard };
}
