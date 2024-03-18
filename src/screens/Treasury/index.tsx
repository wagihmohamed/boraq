import { AppLayout } from '@/components/AppLayout';
import { useReports } from '@/hooks/useReports';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';

export const TreasuryScreen = () => {
  const { isError, isInitialLoading, data } = useReports({
    status: 'PAID',
    types: ['DELIVERY_AGENT', 'BRANCH', 'COMPANY'],
  });
  return (
    <AppLayout isLoading={isInitialLoading} isError={isError}>
      <DataTable
        data={data?.data.reports || []}
        columns={columns}
        filters={{}}
        setFilters={() => {}}
      />
    </AppLayout>
  );
};
