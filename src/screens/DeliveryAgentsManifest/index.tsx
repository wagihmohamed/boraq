import { AppLayout } from '@/components/AppLayout';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { useDeliveryAgentsManifest } from '@/hooks/useDeliveryAgentsManifest';
import { LoadingOverlay, Select } from '@mantine/core';
import { ManifestFilters } from '@/services/getDeliveryAgentManifest';
import { useState } from 'react';
import { useBranches } from '@/hooks/useBranches';
import { getSelectOptions } from '@/lib/getSelectOptions';

export const DeliveryAgentsManifest = () => {
  const [filters, setFilters] = useState<ManifestFilters>({
    page: 1,
    size: 10,
    branch_id: undefined,
  });

  const {
    data: agentsManifestData,
    isError,
    isInitialLoading,
  } = useDeliveryAgentsManifest(filters);

  const { data: branchesData } = useBranches({ size: 1000 });

  return (
    <AppLayout isError={isError}>
      <Select
        label="الفروع"
        data={getSelectOptions(branchesData?.data || [])}
        clearable
        searchable
        limit={50}
        placeholder="اختار الفرع"
        value={filters.branch_id?.toString()}
        onChange={(e) => {
          setFilters({
            ...filters,
            branch_id: Number(e),
          });
        }}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          navigationURL="/orders/add"
          columns={columns}
          data={agentsManifestData?.data || []}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: agentsManifestData?.pagesCount,
          }}
        />
      </div>
    </AppLayout>
  );
};
