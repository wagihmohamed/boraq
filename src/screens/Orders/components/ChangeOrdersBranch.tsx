import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select } from '@mantine/core';
import { useBranches } from '@/hooks/useBranches';
import { useState } from 'react';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useOrdersStore } from '@/store/ordersStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOrderPayload, editOrderService } from '@/services/editOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const ChangeOrdersBranch = () => {
  const queryClient = useQueryClient();
  const { orders: selectedOrders } = useOrdersStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: branchesData } = useBranches({ size: 1000 });
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const { mutate: editOrder, isLoading } = useMutation({
    mutationFn: ({ data, id }: { id: number; data: EditOrderPayload }) =>
      editOrderService({
        id,
        data,
      }),
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = () => {
    if (selectedBranch) {
      selectedOrders.forEach((order) => {
        editOrder({
          id: Number(order.id),
          data: {
            branchID: Number(selectedBranch),
          },
        });
      });
      toast.success('تم تعديل الفرع بنجاح');
    }
  };

  return (
    <>
      <Modal
        title="تغيير الفرع المستلم"
        opened={opened}
        onClose={close}
        centered
      >
        <Select
          value={selectedBranch}
          allowDeselect
          label="الفرع"
          searchable
          clearable
          onChange={(e) => {
            setSelectedBranch(e);
          }}
          placeholder="اختر المندوب"
          data={getSelectOptions(branchesData?.data || [])}
          limit={100}
        />
        <div className="flex justify-between mt-4 gap-6">
          <Button
            loading={false}
            disabled={!selectedBranch || isLoading}
            fullWidth
            onClick={handleSubmit}
            type="submit"
          >
            تصدير
          </Button>

          <Button
            onClick={() => {
              close();
            }}
            fullWidth
            variant="outline"
          >
            الغاء
          </Button>
        </div>
      </Modal>

      <Button disabled={!selectedOrders.length} onClick={open}>
        تغيير الفرع المستلم
      </Button>
    </>
  );
};
