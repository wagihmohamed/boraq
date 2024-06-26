import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ActionIcon } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { IconTrash } from '@tabler/icons-react';
import { deleteColorService } from '@/services/deleteColor';

export const DeleteColor = ({ colorId }: { colorId: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteSize, isLoading } = useMutation({
    mutationFn: (id: number) => deleteColorService({ id }),
    onSuccess: () => {
      toast.success('تم حذف اللون بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['colors'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء حذف اللون');
    },
  });

  const handleDelete = () => {
    deleteSize(colorId);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح المخزن" centered>
        هل انت متأكد من مسح اللون؟ لا يمكن التراجع عن هذا الإجراء
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

      <ActionIcon size="lg" color="red" onClick={open}>
        <IconTrash className="text-white" />
      </ActionIcon>
    </>
  );
};
