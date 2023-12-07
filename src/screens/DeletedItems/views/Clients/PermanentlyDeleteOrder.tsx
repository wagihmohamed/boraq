import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteClientService } from '@/services/deleteClient';

export const PermanentlyDeleteOrder = ({ clientId }: { clientId: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteBranch, isLoading } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteClientService({ id }),
    onSuccess: () => {
      toast.success('تم مسح العميل بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
      close();
    },
  });

  const handleDelete = () => {
    deleteBranch({ id: clientId });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الموظف" centered>
        هل انت متأكد من مسح العميل؟ لا يمكن التراجع عن هذا الإجراء
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
