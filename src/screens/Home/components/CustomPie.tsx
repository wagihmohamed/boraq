import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { OrdersStatistics } from '@/services/getOrdersStatisticsService';
import { rem } from '@mantine/core';
import { pieChartData } from '@/lib/getParChartData';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CustomPieChartProps {
  labels: string[];
  data: number[];
  additionalData:
    | OrdersStatistics['ordersStatisticsByStatus']
    | OrdersStatistics['ordersStatisticsByGovernorate'];
}

export const CustomPieChart = ({
  data,
  labels,
  additionalData,
}: CustomPieChartProps) => {
  const getTotalCostBuyDataIndex = (index: number) => {
    if (additionalData && additionalData[index]) {
      const dataAtIndex = additionalData[index];
      if ('totalCost' in dataAtIndex) {
        return dataAtIndex.totalCost;
      }
    }
    return '';
  };
  return (
    <Pie
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            rtl: true,
          },
          tooltip: {
            rtl: true,
            callbacks: {
              label: (context) => {
                const label = labels[context.dataIndex];
                const value = data[context.dataIndex];
                return `${label}: ${value} طلب , التكلفة ${getTotalCostBuyDataIndex(
                  context.dataIndex
                )}`;
              },
            },
          },
        },
      }}
      width={rem(600)}
      height={rem(600)}
      data={pieChartData({ labels, data })}
    />
  );
};
