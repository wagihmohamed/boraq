import { Modal, Button } from '@mantine/core';
import { useDeactivateOrder } from '@/hooks/useDeactivateOrder';
import toast from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';
import { useRepositoryOrdersStore } from '@/store/repositoryEntriesOrders';

export const DeleteSelectedRepositoryEntriesModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { repositoryOrders, deleteAllRepositoryOrders } =
    useRepositoryOrdersStore();
  const { mutateAsync: deleteOrder, isLoading } = useDeactivateOrder();

  const handleDelete = async () => {
    await Promise.all(
      repositoryOrders.map(async (order) => {
        await deleteOrder(Number(order.id), {
          onSuccess: () => {},
        });
      })
    );

    toast.success('تم مسح الطلبات بنجاح');
    deleteAllRepositoryOrders();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الطلبات" centered>
        هل انت متأكد من مسح الطلبات؟
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
        disabled={repositoryOrders.length === 0}
        variant="filled"
        onClick={open}
      >
        مسح الصفوف المحددة
      </Button>
    </>
  );
};
