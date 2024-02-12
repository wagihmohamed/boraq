/* eslint-disable import/no-cycle */
import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { orderBulkSchema } from './schema';
import { useLocations } from '@/hooks/useLocations';
import { useStores } from '@/hooks/useStores';
import { Button, Grid, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderPayload, createOrderService } from '@/services/createOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { randomId } from '@mantine/hooks';
import { BulkOrdersItem } from './components/BulkOrdersItem';
import {
  governorateArabicNames,
  governorateArray,
} from '@/lib/governorateArabicNames ';
import { getSelectOptions } from '@/lib/getSelectOptions';

export interface OrderBulkFormValues {
  orders: {
    id: string;
    recipientPhones: {
      phone: string;
      key: string;
    }[];
    totalCost: string;
    quantity: string;
    weight: string;
    storeID: string;
    locationID: string;
    deliveryType: string;
    governorate: string;
    recipientName: string;
    recipientAddress: string;
    receiptNumber: string;
    details: string;
  }[];
}

const createBulkOrdersSelect = [
  {
    label: 'صفحة',
    value: 'page',
  },
  {
    label: 'محافظة',
    value: 'governorate',
  },
];

export const CreateBulkOrders = () => {
  const [ordersTotals, setOrdersTotals] = useState(1);
  const [createBulkOrdersBy, setCreateBulkOrdersBy] = useState<string | null>(
    'governorate'
  );
  const [selectedGovernorate, setSelectedGovernorate] = useState<
    string | null
  >();
  const [selectedStore, setSelectedStore] = useState<string | null>();
  const queryClient = useQueryClient();
  const form = useForm<OrderBulkFormValues>({
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
          quantity: '1',
          weight: '1',
          storeID: '',
          locationID: '',
          deliveryType: '',
          governorate: '',
          recipientName: '',
          recipientAddress: '',
          receiptNumber: '',
          details: '',
        },
      ],
    },
    validate: zodResolver(orderBulkSchema),
  });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({
    size: 1000,
    only_title_and_id: true,
    governorate: form.values.orders[0]
      .governorate as keyof typeof governorateArabicNames,
  });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 1000, only_title_and_id: true });

  const ordersArray = form.values.orders;

  const handleAddOrdersToForm = () => {
    const newAddedOrdersCount = ordersTotals;
    const newOrdersArray = [...ordersArray];
    for (let i = 0; i < newAddedOrdersCount; i += 1) {
      newOrdersArray.push({
        id: randomId(),
        recipientPhones: [
          {
            phone: '',
            key: randomId(),
          },
        ],
        totalCost: '',
        quantity: '1',
        weight: '1',
        storeID: '',
        locationID: '',
        deliveryType: '',
        governorate: '',
        recipientName: '',
        recipientAddress: '',
        receiptNumber: '',
        details: '',
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
        storeID: Number(selectedStore || order.storeID),
        locationID: parseInt(order.locationID as string),
        deliveryType: order.deliveryType,
        governorate: selectedGovernorate || order.governorate,
        recipientName: order.recipientName,
        receiptNumber: Number(order.receiptNumber),
        recipientAddress: order.details,
        details: order.details,
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
          value={ordersTotals}
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
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
          <Select
            data={createBulkOrdersSelect}
            value={createBulkOrdersBy}
            label="ادخال حسب"
            placeholder="اختر الطريقة"
            onChange={(e) => {
              setCreateBulkOrdersBy(e);
              setSelectedGovernorate(null);
              setSelectedStore(null);
            }}
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
          {createBulkOrdersBy === 'governorate' && (
            <Select
              data={governorateArray}
              label="المحافظة"
              value={selectedGovernorate}
              onChange={(e) => {
                setSelectedGovernorate(e);
              }}
              searchable
              allowDeselect={false}
              placeholder="اختر المحافظة"
              size="md"
            />
          )}
          {createBulkOrdersBy === 'page' && (
            <Select
              data={getSelectOptions(storesData?.data || [])}
              label="المتجر"
              searchable
              value={selectedStore}
              onChange={(e) => {
                setSelectedStore(e);
              }}
              allowDeselect={false}
              placeholder="اختر المتجر"
              size="md"
            />
          )}
        </Grid.Col>
      </Grid>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {ordersArray.map((order, index) => (
          <BulkOrdersItem
            form={form}
            handleDeleteOrder={handleDeleteOrder}
            index={index}
            locationsData={locationsData.data}
            storesData={storesData.data}
            createBulkOrdersBy={createBulkOrdersBy}
            key={order.id}
          />
        ))}
        <Button
          loading={isLoading}
          disabled={
            isLoading ||
            (createBulkOrdersBy === 'page' && !selectedStore) ||
            (createBulkOrdersBy === 'governorate' && !selectedGovernorate)
          }
          type="submit"
          fullWidth
          mt="xl"
          size="md"
        >
          رفع وتأكيد
        </Button>
      </form>
    </AppLayout>
  );
};
