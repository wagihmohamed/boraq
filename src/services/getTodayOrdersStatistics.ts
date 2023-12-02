import { ordersStatisticsTodatendpoint } from '@/api/apisUrl';
import { api } from '@/api';

export interface TodayOrdersStatistics {
  status: string;
  data: {
    count: number;
    totalCost: number;
  };
}

export const getTodayOrdersStatisticsService = async () => {
  const response = await api.get<TodayOrdersStatistics>(
    ordersStatisticsTodatendpoint
  );
  return response.data;
};
