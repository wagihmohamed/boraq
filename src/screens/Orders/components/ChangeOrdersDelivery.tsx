import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select } from '@mantine/core';
import { useState } from 'react';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useOrdersStore } from '@/store/ordersStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOrderPayload, editOrderService } from '@/services/editOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { useEmployees } from '@/hooks/useEmployees';

export const ChangeOrdersDelivery = () => {
  const queryClient = useQueryClient();
  const { orders: selectedOrders, deleteAllOrders } = useOrdersStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: deliveryAgents } = useEmployees({
    size: 1000,
    minified: true,
    roles: ['DELIVERY_AGENT'],
  });
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

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
    if (selectedDelivery) {
      selectedOrders.forEach((order) => {
        editOrder({
          id: Number(order.id),
          data: {
            deliveryAgentID: Number(selectedDelivery),
          },
        });
      });
      toast.success('تم تعديل المندوب بنجاح');
    }
  };

  return (
    <>
      <Modal title="تغيير  المندوب" opened={opened} onClose={close} centered>
        <Select
          value={selectedDelivery}
          allowDeselect
          label="المندوب"
          searchable
          clearable
          onChange={(e) => {
            setSelectedDelivery(e);
          }}
          placeholder="اختر المندوب"
          data={getSelectOptions(deliveryAgents?.data || [])}
          limit={100}
        />
        <div className="flex justify-between mt-4 gap-6">
          <Button
            loading={false}
            disabled={!selectedDelivery || isLoading}
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
        تغيير مندوب التوصيل
      </Button>
    </>
  );
};
