import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid, TextInput } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { useState } from 'react';

interface CompanyOrdersStatisticsProps {
  ordersParams: OrdersFilter;
  ordersLength: number;
  ordersMetaData: OrdersMetaData;
  company_id: string;
}

export const CompanyOrdersStatistics = ({
  ordersLength,
  ordersParams,
  ordersMetaData,
  company_id,
}: CompanyOrdersStatisticsProps) => {
  const [baghdadDeliveryCost, setBaghdadDeliveryCost] = useState<number>();
  const [governoratesDeliveryCost, setGovernoratesDeliveryCost] =
    useState<number>();
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    if (!company_id) {
      toast.error('يرجى اختيار شركة');
      return;
    }
    if (!baghdadDeliveryCost && !governoratesDeliveryCost) {
      toast.error('الرجاء ادخال اجور التوصيل');
      return;
    }
    const mutationParams: CreateReportPayload = {
      ordersIDs: '*',
      params: ordersParams,
      type: 'COMPANY',
      companyID: Number(company_id),
      baghdadDeliveryCost,
      governoratesDeliveryCost,
    };
    toast.promise(createReport(mutationParams), {
      loading: 'جاري تصدير الكشف',
      success: 'تم تصدير الكشف بنجاح',
      error: (error) => error.message || 'حدث خطأ ما',
    });
  };
  return (
    <Grid align="center" className="mt-4" grow>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="عدد الطلبيات" value={ordersMetaData.count} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="المبلغ الكلي" value={ordersMetaData.totalCost} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="مبلغ التوصيل"
          value={ordersMetaData.deliveryCost}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="صافي العميل" value={ordersMetaData.clientNet} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <TextInput
          label="اجور توصيل بغداد"
          value={baghdadDeliveryCost}
          onChange={(e) => setBaghdadDeliveryCost(Number(e.target.value))}
          placeholder="اجور توصيل بغداد"
          type="number"
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <TextInput
          label="اجور توصيل المحافظات"
          value={governoratesDeliveryCost}
          onChange={(e) => setGovernoratesDeliveryCost(Number(e.target.value))}
          placeholder="اجور توصيل المحافظات"
          type="number"
        />
      </Grid.Col>
      <Grid.Col className="mt-6" span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <Button
          disabled={ordersLength === 0 || isLoading}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف شركة
        </Button>
      </Grid.Col>
    </Grid>
  );
};
