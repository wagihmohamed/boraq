import { AppLayout } from '@/components/AppLayout';
import { useReports } from '@/hooks/useReports';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { TreasuryFilters } from './components/TreasuryFilters';
import { Grid, LoadingOverlay } from '@mantine/core';
import { TreasuryCard } from './components/TreasuryCard';
import { useAuth } from '@/store/authStore';
import { useTenantDetails } from '@/hooks/useTenantDetails';

const treasuryInitialStatuses: (keyof typeof reportTypeArabicNames)[] = [
  'DELIVERY_AGENT',
  'BRANCH',
  'COMPANY',
];

export const TreasuryScreen = () => {
  const { companyID } = useAuth();
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
  });

  const {
    data: registeredCompanyDetails,
    isLoading: isRegisteredCompanyLoading,
  } = useTenantDetails(Number(companyID));

  const { isError, isInitialLoading, data, isLoading } = useReports({
    status: 'PAID',
    types: filters.types?.length ? filters.types : treasuryInitialStatuses,
    ...filters,
  });

  return (
    <AppLayout isError={isError}>
      <TreasuryFilters filters={filters} setFilters={setFilters} />
      <Grid>
        <TreasuryCard
          title="عدد الكشوفات"
          value={data?.data.reportsMetaData.reportsCount || 0}
          isLoading={isLoading}
          color="red"
        />
        <TreasuryCard
          title="التكلفة الكلية"
          value={data?.data.reportsMetaData.totalCost || 0}
          isLoading={isLoading}
          color="blue"
        />
        <TreasuryCard
          title="المبلغ المدفوع"
          value={data?.data.reportsMetaData.paidAmount || 0}
          isLoading={isLoading}
          color="indigo"
        />
        <TreasuryCard
          title="تكلفة التوصيل"
          value={data?.data.reportsMetaData.clientNet || 0}
          isLoading={isLoading}
          color="orange"
        />
        <TreasuryCard
          title="صافي الشركة"
          value={data?.data.reportsMetaData.companyNet || 0}
          isLoading={isLoading}
          color="violet"
        />
        <TreasuryCard
          title="عدد طلبات بغداد"
          value={data?.data.reportsMetaData.baghdadOrdersCount || 0}
          isLoading={isLoading}
          color="yellow"
        />
        <TreasuryCard
          title="عدد طلبات المحافظات"
          value={data?.data.reportsMetaData.governoratesOrdersCount || 0}
          isLoading={isLoading}
          color="teal"
        />
        <TreasuryCard
          title="الخزنة"
          value={registeredCompanyDetails?.data.treasury || 0}
          isLoading={isRegisteredCompanyLoading}
          color="green"
        />
      </Grid>
      <div className="relative">
        <LoadingOverlay visible={isInitialLoading} />
        {/* <div className="mt-4">
        <CreateDocumentationMenu params={filters} />
      </div> */}
        <DataTable
          data={data?.data.reports || []}
          columns={columns}
          filters={{}}
          setFilters={() => {}}
        />
      </div>
    </AppLayout>
  );
};
