import { Modal, Button } from '@mantine/core';
import { useDeactivateOrder } from '@/hooks/useDeactivateOrder';
import toast from 'react-hot-toast';

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
  open: () => void;
  closeMenu: () => void;
}

export const DeleteOrder = ({ id, close, open, opened, closeMenu }: Props) => {
  const { mutate: deleteOrder, isLoading } = useDeactivateOrder();

  const handleDelete = () => {
    deleteOrder(id, {
      onSuccess: () => {
        close();
        toast.success('تم اضافة الطلب الي قائمة المحذوفات بنجاح بنجاح');
        closeMenu();
      },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          closeMenu();
        }}
        title="مسح الطلب"
        centered
      >
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

      <Button className="mb-2" fullWidth variant="filled" onClick={open}>
        مسح
      </Button>
    </>
  );
};
