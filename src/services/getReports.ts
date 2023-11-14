import { api } from '@/api';
import { getReportsendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { Filters } from './getEmployeesService';

export interface Report {
  id: string;
  status: keyof typeof reportStatusArabicNames;
  createdBy: {
    id: string;
    name: string;
  };
  type: keyof typeof reportTypeArabicNames;
  createdAt: string;
  updatedAt: string;
  ClientReport: {
    reportNumber: string;
    client: {
      id: string;
      name: string;
    };
    store: {
      id: string;
      name: string;
    };
    orders: {
      id: string;
      receiptNumber: string;
      clientReportReportNumber: string;
    }[];
  } | null;
  RepositoryReport: {
    reportNumber: string;
    repository: {
      id: string;
      name: string;
    };
    orders: {
      id: string;
      receiptNumber: string;
      repositoryReportReportNumber: string;
    }[];
  } | null;
  BranchReport: {
    reportNumber: string;
    branch: {
      id: string;
      name: string;
    };
    orders: {
      id: string;
      receiptNumber: string;
      branchReportReportNumber: string;
    }[];
  } | null;
  GovernorateReport: {
    reportNumber: string;
    governorate: keyof typeof governorateArabicNames;
    orders: {
      id: string;
      receiptNumber: string;
      governorateReportReportNumber: string;
    }[];
  } | null;
  DeliveryAgentReport: {
    reportNumber: string;
    deliveryAgent: {
      id: string;
      name: string;
    };
    orders: {
      id: string;
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

interface ReportsFilters extends Filters {
  start_date?: Date | string | null;
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
