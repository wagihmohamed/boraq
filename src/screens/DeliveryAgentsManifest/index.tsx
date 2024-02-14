/* eslint-disable @typescript-eslint/naming-convention */
import { AppLayout } from '@/components/AppLayout';
import { useBranches } from '@/hooks/useBranches';
import { useDeliveryAgentsManifest } from '@/hooks/useDeliveryAgentsManifest';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { ManifestFilters } from '@/services/getDeliveryAgentManifest';
import { useManifestStore } from '@/store/manifestStore';
import {
  Accordion,
  Button,
  LoadingOverlay,
  Paper,
  Select,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { format, parseISO } from 'date-fns';
import 'dayjs/locale/ar';
import { useState } from 'react';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';

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

  const { data: branchesData } = useBranches({
    size: 1000,
    only_title_and_id: true,
  });

  const convertDateFormat = (date: Date | null): string | null => {
    if (date) {
      const parsedDate = parseISO(date.toISOString());
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    return null;
  };

  return (
    <AppLayout isError={isError}>
      <Accordion variant="separated">
        <Accordion.Item
          className="rounded-md mb-8"
          value="delivery-agents-manifest-filter"
        >
          <Accordion.Control> الفلاتر</Accordion.Control>
          <Accordion.Panel>
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
              <h1 className="font-bold mb-2 text-lg mt-4">
                تاريخ بداية ونهاية الطلبيات
              </h1>
              <div className="">
                <Paper withBorder mb={10} maw="fit-content" radius="md" p={6}>
                  <DatePicker
                    locale="ar"
                    type="range"
                    allowSingleDateInRange
                    value={
                      orders_start_date && orders_end_date
                        ? [
                          new Date(orders_start_date),
                          new Date(orders_end_date),
                        ]
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

                <Button className="mt-4" size="md" onClick={resetFilters}>
                  اعادة تعيين
                </Button>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
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
