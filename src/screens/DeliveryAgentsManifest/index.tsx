/* eslint-disable @typescript-eslint/naming-convention */
import { AppLayout } from '@/components/AppLayout';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { useDeliveryAgentsManifest } from '@/hooks/useDeliveryAgentsManifest';
import { Button, LoadingOverlay, Paper, Select } from '@mantine/core';
import { ManifestFilters } from '@/services/getDeliveryAgentManifest';
import { useState } from 'react';
import { useBranches } from '@/hooks/useBranches';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useManifestStore } from '@/store/manifestStore';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/ar';
import { parseISO, format } from 'date-fns';

export const DeliveryAgentsManifest = () => {
  const {
    branch_id,
    orders_end_date,
    orders_start_date,
    setBranchId,
    resetFilters,
    setOrdersEndDate,
    setOrdersStartDate,
  } = useManifestStore();
  const [filters, setFilters] = useState<ManifestFilters>({
    page: 1,
    size: 10,
  });

  const {
    data: agentsManifestData,
    isError,
    isInitialLoading,
  } = useDeliveryAgentsManifest({
    branch_id,
    page: filters.page,
    pagesCount: filters.pagesCount,
    size: filters.size,
    orders_end_date: orders_end_date || undefined,
    orders_start_date: orders_start_date || undefined,
  });

  const { data: branchesData } = useBranches({ size: 1000 });

  const convertDateFormat = (date: Date | null): string | null => {
    if (date) {
      const parsedDate = parseISO(date.toISOString());
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    return null;
  };

  return (
    <AppLayout isError={isError}>
      <h1 className="font-bold mb-4 text-2xl">تاريخ بداية ونهاية الطلبيات</h1>
      <div className="flex-col md:flex md:flex-row mb-10 gap-6 ">
        <Paper withBorder mb={10} maw="fit-content" radius="md" p={6}>
          <DatePicker
            locale="ar"
            type="range"
            allowSingleDateInRange
            value={
              orders_start_date && orders_end_date
                ? [new Date(orders_start_date), new Date(orders_end_date)]
                : [null, null]
            }
            onChange={(date) => {
              const formatedStartDate = convertDateFormat(date[0]);
              const formatedEndDate = convertDateFormat(date[1]);
              setOrdersStartDate(formatedStartDate);
              setOrdersEndDate(formatedEndDate);
            }}
          />
        </Paper>
        <div className="flex-1 gap-5">
          <Select
            key={branch_id}
            label="الفروع"
            data={getSelectOptions(branchesData?.data || [])}
            clearable
            searchable
            limit={50}
            placeholder="اختار الفرع"
            value={String(branch_id)}
            onChange={(e) => {
              setBranchId(Number(e));
            }}
          />
          <Button className="mt-4" size="md" onClick={resetFilters}>
            اعادة تعيين
          </Button>
        </div>
      </div>
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
