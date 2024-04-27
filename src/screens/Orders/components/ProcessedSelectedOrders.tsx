import { Button } from '@mantine/core';
import { useOrdersStore } from '@/store/ordersStore';
import { useEditOrder } from '@/hooks/useEditOrder';

interface ProcessedSelectedOrdersProps {
  proceedValue: boolean;
}

export const ProcessedSelectedOrders = ({
  proceedValue,
}: ProcessedSelectedOrdersProps) => {
  const { orders: selectedOrders, deleteAllOrders } = useOrdersStore();

  const { mutateAsync: proceedOrder, isLoading } = useEditOrder();

  const handleProceed = async () => {
    await Promise.all(
      selectedOrders.map(async (order) => {
        await proceedOrder({
          id: Number(order.id),
          data: {
            processed: proceedValue,
          },
        });
      })
    );
    deleteAllOrders();
  };

  return (
    <Button
      disabled={selectedOrders.length === 0 || isLoading}
      loading={isLoading}
      variant="filled"
      onClick={handleProceed}
    >
      {proceedValue ? 'معالجة المحدد' : 'إلغاء معالجة المحدد'}
    </Button>
  );
};
