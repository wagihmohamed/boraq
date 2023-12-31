import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { deactivateStoreService } from '@/services/deactivateStore';

export const DeleteStore = ({ storeId }: { storeId: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteStore, isLoading } = useMutation({
    mutationFn: (id: number) => deactivateStoreService({ id }),
    onSuccess: () => {
      toast.success('تم اضافة المتجر الي قائمة المحذوفات بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['stores'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء حذف المتجر');
    },
  });

  const handleDelete = () => {
    deleteStore(storeId);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح المتجر" centered>
        هل انت متأكد من مسح المتجر؟
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

      <Button fullWidth variant="filled" onClick={open}>
        مسح
      </Button>
    </>
  );
};
