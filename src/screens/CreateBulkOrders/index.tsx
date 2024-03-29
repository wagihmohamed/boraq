import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { createBulkOfOrdersSchema } from './schema';
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
import { z } from 'zod';
import { CreateStoreModal } from './components/CreateStoreModal';
import { CreateClientAndStoreModal } from './components/CreateClientAndStoreModal';

export interface OrderBulkFormValues {
  orders: {
    id: string;
    withProducts: boolean;
    recipientPhones: {
      phone: string;
      key: string;
    }[];
    totalCost: number;
    quantity: string;
    weight: number;
    storeID: string;
    locationID: string;
    deliveryType: string;
    governorate: string;
    recipientName: string;
    recipientAddress: string;
    receiptNumber: string;
    details: string;
    products?: {
      productID: string;
      quantity: string;
      colorID: string;
      sizeID: string;
      label?: string;
    }[];
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
          withProducts: false,
          recipientPhones: [
            {
              phone: '',
              key: randomId(),
            },
          ],
          totalCost: 0,
          quantity: '1',
          weight: 1,
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
    validate: zodResolver(createBulkOfOrdersSchema),
  });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({
    size: 100000,
    minified: true,
    governorate:
      (selectedGovernorate as keyof typeof governorateArabicNames) || undefined,
  });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 100000, minified: true });

  const ordersArray = form.values.orders;

  const handleAddOrdersToForm = () => {
    const newAddedOrdersCount = ordersTotals;
    const newOrdersArray = [...ordersArray];
    for (let i = 0; i < newAddedOrdersCount; i += 1) {
      newOrdersArray.push({
        id: randomId(),
        withProducts: false,
        recipientPhones: [
          {
            phone: '',
            key: randomId(),
          },
        ],
        totalCost: 0,
        quantity: '1',
        weight: 1,
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
    if (ordersArray.length === 1) {
      return;
    }
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
      setOrdersTotals(1);
      setSelectedGovernorate(null);
      setSelectedStore(null);
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof createBulkOfOrdersSchema>) => {
    const ordersArray = values.orders.map((order) => {
      if (order.withProducts) {
        return {
          withProducts: order.withProducts,
          governorate: selectedGovernorate || order.governorate || '',
          recipientAddress: order.details,
          recipientName: order.recipientName || 'افتراضي',
          recipientPhones: order.recipientPhones.map((phone) => phone.phone),
          storeID: Number(selectedStore || order.storeID),
          details: order.details,
          notes: order.notes,
          products: order.products?.map((product) => {
            return {
              productID: Number(product.productID),
              quantity: Number(product.quantity),
              colorID: Number(product.colorID),
              sizeID: Number(product.sizeID),
            };
          }),
        };
      }
      return {
        withProducts: order.withProducts,
        governorate: selectedGovernorate || order.governorate || '',
        recipientAddress: order.details,
        recipientName: order.recipientName || 'افتراضي',
        recipientPhones: order.recipientPhones.map((phone) => phone.phone),
        storeID: Number(selectedStore || order.storeID),
        details: order.details,
        notes: order.notes,
        totalCost: Number(order.totalCost),
      };
    });

    createOrder(ordersArray);
  };

  return (
    <AppLayout>
      <div className="flex gap-4 flex-wrap">
        <CreateStoreModal />
        <CreateClientAndStoreModal />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <TextInput
          label="عدد الطلبات"
          type="number"
          size="md"
          value={ordersTotals}
          onChange={(e) => {
            setOrdersTotals(parseInt(e.currentTarget.value));
          }}
        />
        <Button
          size="md"
          variant="outline"
          color="blue"
          className="mt-6"
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
