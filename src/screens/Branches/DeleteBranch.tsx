import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBranchService } from '@/services/deleteBranchService';
import toast from 'react-hot-toast';

export const DeleteBranch = ({ branchId }: { branchId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteBranch } = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteBranchService({ id }),
    onSuccess: () => {
      toast.success('تم مسح الفرع بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['branches'],
      });
    },
  });

  const handleDelete = () => {
    deleteBranch({ id: branchId });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الموظف" centered>
        هل انت متأكد من مسح الفرع؟ لا يمكن التراجع عن هذا الإجراء
        <div className="mt-4 flex items-center gap-4">
          <Button variant="filled" onClick={handleDelete}>
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
