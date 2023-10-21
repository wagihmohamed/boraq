import { AppLayout } from '@/components/AppLayout';
import {
  Button,
  Grid,
  Image,
  Switch,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addTenantSchema } from './schema';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import {
  CreateTenantPayload,
  createTenantService,
} from '@/services/createTenant';

export const AddTenant = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    validate: zodResolver(addTenantSchema),
    initialValues: {
      name: '',
      phone: '',
      website: '',
      logo: 'https://private-publicity.name/',
      registrationText: '',
      governoratePrice: '',
      deliveryAgentFee: '',
      baghdadPrice: '',
      additionalPriceForEvery500000IraqiDinar: '',
      additionalPriceForEveryKilogram: '',
      additionalPriceForRemoteAreas: '',
      orderStatusAutomaticUpdate: false,
    },
  });

  const { mutate: editTenantAction, isLoading: isEditting } = useMutation({
    mutationFn: ({
      additionalPriceForEvery500000IraqiDinar,
      additionalPriceForEveryKilogram,
      additionalPriceForRemoteAreas,
      baghdadPrice,
      deliveryAgentFee,
      governoratePrice,
      logo,
      name,
      orderStatusAutomaticUpdate,
      phone,
      registrationText,
      website,
    }: CreateTenantPayload) => {
      return createTenantService({
        additionalPriceForEvery500000IraqiDinar,
        additionalPriceForEveryKilogram,
        additionalPriceForRemoteAreas,
        baghdadPrice,
        deliveryAgentFee,
        governoratePrice,
        logo,
        name,
        orderStatusAutomaticUpdate,
        phone,
        registrationText,
        website,
      });
    },
    onSuccess: () => {
      toast.success('تم انشاء الشركة بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['tenantDetails'],
      });
      navigate('/tenants');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addTenantSchema>) => {
    editTenantAction({
      additionalPriceForEvery500000IraqiDinar: parseInt(
        values.additionalPriceForEvery500000IraqiDinar,
        10
      ),
      additionalPriceForEveryKilogram: parseInt(
        values.additionalPriceForEveryKilogram,
        10
      ),
      additionalPriceForRemoteAreas: parseInt(
        values.additionalPriceForRemoteAreas,
        10
      ),
      baghdadPrice: parseInt(values.baghdadPrice, 10),
      deliveryAgentFee: parseInt(values.deliveryAgentFee, 10),
      governoratePrice: parseInt(values.governoratePrice, 10),
      logo: values.logo,
      name: values.name,
      orderStatusAutomaticUpdate: values.orderStatusAutomaticUpdate,
      phone: values.phone,
      registrationText: values.registrationText,
      website: values.website,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/tenants');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة الشركة</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="اسم الشركة" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الهاتف"
              {...form.getInputProps('phone')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="الموقع" {...form.getInputProps('website')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="سعر توصيل لبغداد"
              {...form.getInputProps('baghdadPrice')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="سعر توصيل للمحافظات"
              {...form.getInputProps('governoratePrice')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="تكلفة المندوب"
              {...form.getInputProps('deliveryAgentFee')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="السعر الاضافي لكل 500000 دينار عراقي"
              {...form.getInputProps('additionalPriceForEvery500000IraqiDinar')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="السعر الاضافي لكل كيلوغرام"
              {...form.getInputProps('additionalPriceForEveryKilogram')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="السعر الاضافي للمناطق النائية"
              {...form.getInputProps('additionalPriceForRemoteAreas')}
              type="number"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Switch
              className="mt-8"
              {...form.getInputProps('orderStatusAutomaticUpdate')}
              label="تحديث حالة الطلب تلقائيا"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <Image
              className="w-64 h-[390px]"
              fit="cover"
              radius="lg"
              src="a"
              fallbackSrc="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <Textarea
              label="وصف الشركة"
              {...form.getInputProps('registrationText')}
              rows={10}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              loading={isEditting}
              disabled={isEditting}
            >
              اضافة
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              onClick={() => {
                navigate('/tenants');
              }}
              type="submit"
              variant="outline"
              fullWidth
              mt="xl"
              size="md"
            >
              العودة
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
