import { getAutomaticUpdatesendpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Filters } from './getEmployeesService';

export type ReturnCondition = 'WITH_AGENT' | 'IN_REPOSITORY';

export interface AutomaticUpdate {
  id: number;
  createdAt: string;
  updatedAt: string;
  company: {
    id: number;
    name: string;
  };
  orderStatus: keyof typeof orderStatusArabicNames;
  governorate: keyof typeof governorateArabicNames;
  branch: {
    id: number;
    name: string;
  };
  newOrderStatus: keyof typeof governorateArabicNames;
  checkAfter: number;
  enabled: boolean;
}

export interface GetAutomaticUpdateResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: AutomaticUpdate[];
}

export const getAutomaticUpdatesService = async (
  { page = 1, size = 10, minified = false }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetAutomaticUpdateResponse>(
    getAutomaticUpdatesendpoint,
    {
      params: {
        page,
        size,
        minified: minified || undefined,
      },
    }
  );
  return response.data;
};
