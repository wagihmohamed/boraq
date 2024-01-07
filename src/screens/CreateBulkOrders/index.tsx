import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { orderBulkSchema } from './schema';
import { useLocations } from '@/hooks/useLocations';
import { useStores } from '@/hooks/useStores';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderPayload, createOrderService } from '@/services/createOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { BulkOrdersItem } from './components/BulkOrdersItem';
import { randomId } from '@mantine/hooks';

export const CreateBulkOrders = () => {
  const [ordersToatals, setOrdersTotals] = useState(1);
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      orders: [
        {
          id: randomId(),
          recipientPhones: [
            {
              phone: '',
              key: randomId(),
            },
          ],
          totalCost: '',
          quantity: '',
          weight: '',
          storeID: '',
          locationID: '',
          deliveryType: '',
          governorate: '',
          recipientName: '',
          recipientAddress: '',
        },
      ],
    },
    validate: zodResolver(orderBulkSchema),
  });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({ size: 500 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 500 });

  const ordersArray = form.values.orders;

  const handleAddOrdersToForm = () => {
    const newAddedOrdersCount = ordersToatals;
    const newOrdersArray = [...ordersArray];
    for (let i = 0; i < newAddedOrdersCount; i += 1) {
      newOrdersArray.push({
        id: Math.random().toString(),
        recipientPhones: [
          {
            phone: '',
            key: randomId(),
          },
        ],
        totalCost: '',
        quantity: '',
        weight: '',
        storeID: '',
        locationID: '',
        deliveryType: '',
        governorate: '',
        recipientName: '',
        recipientAddress: '',
      });
    }
    form.setValues({ orders: newOrdersArray });
  };

  const handleDeleteOrder = (index: number) => {
    form.removeListItem('orders', index);
  };

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: (data: CreateOrderPayload) => {
      return createOrderService(data);
    },
    onSuccess: () => {
      toast.success('تم اضافة الطلب بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ordersStatistics'],
      });
      form.reset();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = () => {
    if (!form.isValid()) return;
    const orders = form.values.orders.map((order) => {
      return {
        withProducts: false,
        totalCost: Number(order.totalCost),
        quantity: Number(order.quantity),
        weight: Number(order.weight),
        recipientPhones: order.recipientPhones.map((phone) => phone.phone),
        storeID: parseInt(order.storeID as string),
        locationID: parseInt(order.locationID as string),
        deliveryType: order.deliveryType,
        governorate: order.governorate,
        recipientName: order.recipientName,
        recipientAddress: order.recipientAddress,
      };
    });
    createOrder(orders);
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <TextInput
          label="عدد الطلبات"
          type="number"
          size="md"
          className="w-full"
          value={ordersToatals}
          onChange={(e) => {
            setOrdersTotals(parseInt(e.currentTarget.value));
          }}
        />
        <Button
          size="md"
          variant="outline"
          color="blue"
          onClick={handleAddOrdersToForm}
        >
          انشاء
        </Button>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {ordersArray.map((order, index) => (
          <BulkOrdersItem
            form={form}
            handleDeleteOrder={handleDeleteOrder}
            index={index}
            locationsData={locationsData.data}
            storesData={storesData.data}
            key={order.id}
          />
        ))}
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          onClick={handleSubmit}
        >
          رفع وتأكيد
        </Button>
      </form>
    </AppLayout>
  );
};
