import { Grid } from '@mantine/core';
import { ReportsMetaData } from '@/services/getReports';

interface ReportsStatisticsProps {
  reportsMetaData?: ReportsMetaData;
}

const StatisticsItem = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="flex flex-col items-start justify-start space-y-2 w-full border p-2 rounded-md">
      <p className="text-md">{title}</p>
      <p className="text-2xl font-bold text-center">{value}</p>
    </div>
  );
};

export const ReportsStatistics = ({
  reportsMetaData,
}: ReportsStatisticsProps) => {
  return (
    <Grid grow>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="العدد الكلي للطلبات"
          value={
            (reportsMetaData?.baghdadOrdersCount || 0) +
            (reportsMetaData?.governoratesOrdersCount || 0)
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="عدد طلبات بغداد"
          value={reportsMetaData?.baghdadOrdersCount || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="عدد طلبات المحافظات"
          value={reportsMetaData?.governoratesOrdersCount || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="عدد الكشوفات"
          value={reportsMetaData?.reportsCount || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="التكلفة الكلية"
          value={reportsMetaData?.totalCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="المبلغ المدفوع"
          value={reportsMetaData?.paidAmount || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="تكلفة التوصيل"
          value={reportsMetaData?.deliveryCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="صافي العميل"
          value={reportsMetaData?.clientNet || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="صافي الشركة"
          value={reportsMetaData?.companyNet || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, xs: 3, sm: 3, md: 2, lg: 2, xl: 1 }}>
        <StatisticsItem
          title="صافي المندوب"
          value={reportsMetaData?.deliveryAgentNet || 0}
        />
      </Grid.Col>
    </Grid>
  );
};
