import { api } from '@/api';
import { getReportsendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { Filters } from './getEmployeesService';

export interface Report {
  id: number;
  status: keyof typeof reportStatusArabicNames;
  createdBy: {
    id: number;
    name: string;
  };
  type: keyof typeof reportTypeArabicNames;
  createdAt: string;
  updatedAt: string;
  clientReport: {
    reportNumber: string;
    client: {
      id: number;
      name: string;
    };
    store: {
      id: number;
      name: string;
    };
    orders: {
      id: number;
      receiptNumber: string;
      clientReportReportNumber: string;
    }[];
  } | null;
  repositoryReport: {
    reportNumber: string;
    repository: {
      id: number;
      name: string;
    };
    orders: {
      id: number;
      receiptNumber: string;
      repositoryReportReportNumber: string;
    }[];
  } | null;
  branchReport: {
    reportNumber: string;
    branch: {
      id: number;
      name: string;
    };
    orders: {
      id: number;
      receiptNumber: string;
      branchReportReportNumber: string;
    }[];
  } | null;
  governorateReport: {
    reportNumber: string;
    governorate: keyof typeof governorateArabicNames;
    orders: {
      id: number;
      receiptNumber: string;
      governorateReportReportNumber: string;
    }[];
  } | null;
  deliveryAgentReport: {
    reportNumber: string;
    deliveryAgent: {
      id: number;
      name: string;
    };
    orders: {
      id: number;
      receiptNumber: string;
      deliveryAgentReportReportNumber: string;
    }[];
  } | null;
}

export interface GetReportsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Report[];
}

export interface ReportsFilters extends Filters {
  start_date?: Date | string | null;
  sort?: string;
  end_date?: Date | string | null;
  client_id?: string;
  store_id?: string;
  repository_id?: string;
  branch_id?: string;
  delivery_agent_id?: string;
  governorate?: string;
  status?: string;
  type?: string;
}

export const getReportsService = async (
  {
    start_date,
    end_date,
    client_id,
    store_id,
    repository_id,
    branch_id,
    delivery_agent_id,
    governorate,
    status,
    type,
  }: ReportsFilters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetReportsResponse>(getReportsendpoint, {
    params: {
      start_date: start_date || undefined,
      end_date: end_date || undefined,
      client_id: client_id || undefined,
      store_id: store_id || undefined,
      repository_id: repository_id || undefined,
      branch_id: branch_id || undefined,
      delivery_agent_id: delivery_agent_id || undefined,
      governorate: governorate || undefined,
      status: status || undefined,
      type: type || undefined,
    },
  });
  return response.data;
};
