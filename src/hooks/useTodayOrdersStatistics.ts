import { getTodayOrdersStatisticsService } from '@/services/getTodayOrdersStatistics';
import { useQuery } from '@tanstack/react-query';

export const useTodayOrdersStatistics = () => {
  return useQuery({
    queryKey: ['ordersStatistics', 'today'],
    queryFn: () => getTodayOrdersStatisticsService(),
  });
};
