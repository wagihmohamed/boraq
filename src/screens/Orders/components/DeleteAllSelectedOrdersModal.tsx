import { Modal, Button } from '@mantine/core';
import { useDeactivateOrder } from '@/hooks/useDeactivateOrder';
import toast from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';
import { useOrdersStore } from '@/store/ordersStore';

export const DeleteAllSelectedOrdersModal = () => {
  const { orders: selectedOrders, deleteAllOrders } = useOrdersStore();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync: deleteOrder, isLoading } = useDeactivateOrder();

  const handleDelete = async () => {
    await Promise.all(
      selectedOrders.map(async (order) => {
        await deleteOrder(Number(order.id));
      })
    );
    deleteAllOrders();
    toast.success('تم مسح الطلبات بنجاح');
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الطلب" centered>
        هل انت متأكد من مسح الطلب؟
        <div className="mt-4 flex items-center gap-4">
          <Button
            loading={isLoading}
            disabled={isLoading}
            variant="filled"
            onClick={handleDelete}
          >
            مسح
          </Button>
          <Button variant="outline" onClick={close} className="mr-4">
            إلغاء
          </Button>
        </div>
      </Modal>

      <Button
        disabled={selectedOrders.length === 0 || isLoading}
        loading={isLoading}
        variant="filled"
        onClick={open}
      >
        مسح
      </Button>
    </>
  );
};
