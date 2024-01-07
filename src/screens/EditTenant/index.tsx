import { AppLayout } from '@/components/AppLayout';
import { useTenantDetails } from '@/hooks/useTenantDetails';
import { Button, Grid, Switch, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTenantSchema } from './schema';
import { useEffect } from 'react';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTenantService } from '@/services/editTenant';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { FileWithPath } from '@mantine/dropzone';
import { ImageUploader } from '@/components/CustomDropZone';
import { IMAGE_BASE_URL } from '@/api';

export const EditTenant = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: tenantDetails,
    isLoading,
    isError,
  } = useTenantDetails(parseInt(id));

  const form = useForm({
    validate: zodResolver(editTenantSchema),
    initialValues: {
      name: '',
      phone: '',
      website: '',
      logo: [] as unknown as FileWithPath[],
      registrationText: '',
      governoratePrice: 0,
      deliveryAgentFee: 0,
      baghdadPrice: 0,
      additionalPriceForEvery500000IraqiDinar: 0,
      additionalPriceForEveryKilogram: 0,
      additionalPriceForRemoteAreas: 0,
      orderStatusAutomaticUpdate: false,
    },
  });

  useEffect(() => {
    if (tenantDetails) {
      const imageAddress = IMAGE_BASE_URL + tenantDetails.data.logo;
      form.setValues({
        name: tenantDetails.data.name,
        phone: tenantDetails.data.phone,
        website: tenantDetails.data.website,
        logo: [imageAddress] as unknown as FileWithPath[],
        registrationText: tenantDetails.data.registrationText,
        governoratePrice: tenantDetails.data.governoratePrice,
        deliveryAgentFee: tenantDetails.data.deliveryAgentFee,
        baghdadPrice: tenantDetails.data.baghdadPrice,
        additionalPriceForEvery500000IraqiDinar:
          tenantDetails.data.additionalPriceForEvery500000IraqiDinar,
        additionalPriceForEveryKilogram:
          tenantDetails.data.additionalPriceForEveryKilogram,
        additionalPriceForRemoteAreas:
          tenantDetails.data.additionalPriceForRemoteAreas,
        orderStatusAutomaticUpdate:
          tenantDetails.data.orderStatusAutomaticUpdate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantDetails]);

  const { mutate: editTenantAction, isLoading: isEditting } = useMutation({
    mutationFn: (data: FormData) => {
      return editTenantService({
        data,
        id: parseInt(id),
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل الشركة بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['tenantDetails'],
      });
      navigate('/tenants');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof editTenantSchema>) => {
    const formData = new FormData();
    formData.append(
      'additionalPriceForEvery500000IraqiDinar',
      String(values.additionalPriceForEvery500000IraqiDinar)
    );
    formData.append(
      'additionalPriceForEveryKilogram',
      String(values.additionalPriceForEveryKilogram)
    );
    formData.append(
      'additionalPriceForRemoteAreas',
      String(values.additionalPriceForRemoteAreas)
    );
    formData.append('baghdadPrice', String(values.baghdadPrice));
    formData.append('deliveryAgentFee', String(values.deliveryAgentFee));
    formData.append('governoratePrice', String(values.governoratePrice));
    formData.append('logo', values.logo[0] || '');
    formData.append('name', values.name);
    formData.append(
      'orderStatusAutomaticUpdate',
      values.orderStatusAutomaticUpdate.toString()
    );
    formData.append('phone', values.phone);
    formData.append('registrationText', values.registrationText);
    formData.append('website', values.website);
    editTenantAction(formData);
  };

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/tenants');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل الشركة</h1>
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
              checked={form.values.orderStatusAutomaticUpdate}
              onChange={(event) => {
                form.setFieldValue(
                  'orderStatusAutomaticUpdate',
                  event.currentTarget.checked
                );
              }}
              label="تحديث حالة الطلب تلقائيا"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <ImageUploader
              image={form.values.logo}
              onDrop={(files) => {
                form.setFieldValue('logo', files);
              }}
              onDelete={() => {
                form.setFieldValue('logo', []);
              }}
              error={!!form.errors.logo}
            />
            {form.errors.logo && (
              <div className="text-red-500">{form.errors.logo}</div>
            )}
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
              تعديل
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
