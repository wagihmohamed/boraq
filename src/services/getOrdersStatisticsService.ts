import { ordersStatisticsendpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface OrdersStatistics {
  ordersStatisticsByStatus: {
    status: keyof typeof orderStatusArabicNames;
    totalCost: string;
    count: number;
  }[];
  ordersStatisticsByGovernorate: {
    governorate: keyof typeof governorateArabicNames;
    totalCost: string;
    count: number;
  }[];
  allOrdersStatistics: {
    totalCost: string;
    count: number;
  };
  allOrdersStatisticsWithoutClientReport: {
    totalCost: string;
    count: number;
  };
  todayOrdersStatistics: {
    totalCost: string;
    count: number;
  };
}

export interface OrdersStatisticsResponse {
  status: string;
  data: OrdersStatistics;
}

export interface OrdersStatisticsFilter {
  status?: keyof typeof orderStatusArabicNames;
  store_id?: number;
  tenant_id?: number;
  start_date?: string;
  end_date?: string;
  recorded?: string;
}

export const getOrdersStatisticsService = async (
  filters?: OrdersStatisticsFilter
) => {
  const response = await api.get<OrdersStatisticsResponse>(
    ordersStatisticsendpoint,
    {
      params: {
        status: filters?.status || undefined,
        store_id: filters?.store_id || undefined,
        tenant_id: filters?.tenant_id || undefined,
        start_date: filters?.start_date || undefined,
        end_date: filters?.end_date || undefined,
        recorded: filters?.recorded || undefined,
      },
    }
  );
  return response.data;
};
