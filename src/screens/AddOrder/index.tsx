/* eslint-disable radix */
import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { addOrderSchema } from './schema';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Select,
  Switch,
  TextInput,
  Textarea,
} from '@mantine/core';
import { deliveryTypesArray } from '@/lib/deliveryTypesArabicNames';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { useLocations } from '@/hooks/useLocations';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderPayload, createOrderService } from '@/services/createOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const AddOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    validate: zodResolver(addOrderSchema),
    initialValues: {
      withProducts: false,
      totalCost: '',
      quantity: '',
      weight: '',
      recipientName: '',
      recipientPhone: '',
      recipientAddress: '',
      notes: '',
      details: '',
      deliveryType: '',
      governorate: '',
      locationID: '',
      storeID: '',
    },
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

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: (data: CreateOrderPayload) => {
      return createOrderService(data);
    },
    onSuccess: () => {
      toast.success('تم اضافة الطلب بنجاح');
      navigate('/orders');
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      form.reset();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleCreateOrder = (values: z.infer<typeof addOrderSchema>) => {
    createOrder({
      deliveryType: values.deliveryType,
      details: values.details,
      governorate: values.governorate,
      locationID: values.locationID,
      notes: values.notes,
      quantity: parseInt(values.quantity),
      recipientAddress: values.recipientAddress,
      recipientName: values.recipientName,
      recipientPhone: values.recipientPhone,
      storeID: values.storeID,
      totalCost: parseInt(values.totalCost),
      weight: parseInt(values.weight),
      withProducts: values.withProducts,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/orders');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة طلب</h1>
      </div>
      <form onSubmit={form.onSubmit(handleCreateOrder)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="اجمالي التكلفة"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('totalCost')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الكمية"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('quantity')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الوزن"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('weight')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="اسم المستلم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="رقم المستلم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientPhone')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="العنوان"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientAddress')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المتجر"
              placeholder="اختار المتجر"
              data={getSelectOptions(storesData.data)}
              {...form.getInputProps('storeID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المناطق"
              placeholder="اختار المنطقة"
              data={getSelectOptions(locationsData.data)}
              {...form.getInputProps('locationID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="نوع التوصيل"
              placeholder="اختار نوع التوصيل"
              data={deliveryTypesArray}
              {...form.getInputProps('deliveryType')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المحافظة"
              placeholder="اختار المحافظة"
              data={governorateArray}
              {...form.getInputProps('governorate')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Textarea
              label="الملاحظات"
              {...form.getInputProps('notes')}
              rows={7}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Textarea
              label="التفاصيل"
              {...form.getInputProps('details')}
              rows={7}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Switch
              className="mt-8"
              {...form.getInputProps('withProducts')}
              label="مع منتجات"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }} />
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              fullWidth
              mt="xl"
              size="md"
            >
              اضافة
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="reset"
              fullWidth
              mt="xl"
              size="md"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
            >
              الغاء
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
