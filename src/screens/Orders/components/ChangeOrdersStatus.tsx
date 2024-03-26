import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select } from '@mantine/core';
import { useState } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOrderPayload, editOrderService } from '@/services/editOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import {
  orderStatusArabicNames,
  orderStatusArray,
} from '@/lib/orderStatusArabicNames';

export const ChangeOrdersStatus = () => {
  const queryClient = useQueryClient();
  const { orders: selectedOrders, deleteAllOrders } = useOrdersStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBranch, setSelectedBranch] = useState<
    keyof typeof orderStatusArabicNames | null
  >(null);

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
      queryClient.invalidateQueries({
        queryKey: ['timeline'],
      });
      deleteAllOrders();
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
            status: selectedBranch,
          },
        });
      });
      toast.success('تم تعديل الفرع بنجاح');
    }
  };

  return (
    <>
      <Modal title="تغيير  الحالة" opened={opened} onClose={close} centered>
        <Select
          value={selectedBranch}
          allowDeselect
          label="الحالة"
          searchable
          clearable
          onChange={(e) => {
            setSelectedBranch(e as keyof typeof orderStatusArabicNames);
          }}
          placeholder="اختر الحالة"
          data={orderStatusArray}
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
            تعديل
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
        تغير الحالة
      </Button>
    </>
  );
};
