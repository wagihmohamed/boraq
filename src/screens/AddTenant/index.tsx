import { AppLayout } from '@/components/AppLayout';
import {
  Button,
  Grid,
  PasswordInput,
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
import { createTenantService } from '@/services/createTenant';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';

export const AddTenant = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    validate: zodResolver(addTenantSchema),
    initialValues: {
      name: '',
      phone: '',
      website: '',
      logo: [] as unknown as FileWithPath[],
      registrationText: '',
      governoratePrice: '',
      deliveryAgentFee: '',
      baghdadPrice: '',
      additionalPriceForEvery500000IraqiDinar: '',
      additionalPriceForEveryKilogram: '',
      additionalPriceForRemoteAreas: '',
      orderStatusAutomaticUpdate: false,
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: createTenantAction, isLoading: isEditing } = useMutation({
    mutationFn: (data: FormData) => {
      return createTenantService(data);
    },
    onSuccess: () => {
      toast.success('تم انشاء الشركة بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['tenants'],
      });
      navigate('/tenants');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addTenantSchema>) => {
    const formData = new FormData();

    const companyManager = {
      username: values.phone,
      name: `مدير شركة ${values.name}`,
      phone: values.phone,
      password: values.password,
    };

    const companyData = {
      name: values.name,
      phone: values.phone,
      website: values.website,
      logo: values.logo[0],
      registrationText: values.registrationText,
      governoratePrice: values.governoratePrice,
      deliveryAgentFee: values.deliveryAgentFee,
      baghdadPrice: values.baghdadPrice,
      additionalPriceForEvery500000IraqiDinar:
        values.additionalPriceForEvery500000IraqiDinar,
      additionalPriceForEveryKilogram: values.additionalPriceForEveryKilogram,
      additionalPriceForRemoteAreas: values.additionalPriceForRemoteAreas,
      orderStatusAutomaticUpdate: values.orderStatusAutomaticUpdate,
    };

    // companyFormData.append('name', values.name);
    // companyFormData.append('phone', values.phone);
    // companyFormData.append('website', values.website);
    // companyFormData.append('logo', values.logo[0]);
    // companyFormData.append('registrationText', values.registrationText);
    // companyFormData.append('governoratePrice', values.governoratePrice);
    // companyFormData.append('deliveryAgentFee', values.deliveryAgentFee);
    // companyFormData.append('baghdadPrice', values.baghdadPrice);
    // companyFormData.append(
    //   'additionalPriceForEvery500000IraqiDinar',
    //   values.additionalPriceForEvery500000IraqiDinar
    // );
    // companyFormData.append(
    //   'additionalPriceForEveryKilogram',
    //   values.additionalPriceForEveryKilogram
    // );
    // companyFormData.append(
    //   'additionalPriceForRemoteAreas',
    //   values.additionalPriceForRemoteAreas
    // );
    // companyFormData.append(
    //   'orderStatusAutomaticUpdate',
    //   values.orderStatusAutomaticUpdate ? 'true' : 'false'
    // );

    // companyManagerFormData.append('username', values.phone);
    // companyManagerFormData.append('name', `مدير شركة ${values.name}`);
    // companyManagerFormData.append('phone', values.phone);
    // companyManagerFormData.append('password', values.password);

    formData.append('companyData', JSON.stringify(companyData));
    formData.append('companyManager', JSON.stringify(companyManager));
    createTenantAction(formData);
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
            <PasswordInput
              label="كلمة المرور"
              placeholder="*******"
              mt="md"
              size="md"
              className="w-full"
              {...form.getInputProps('password')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <PasswordInput
              label="تأكيد كلمة المرور"
              placeholder="*******"
              mt="md"
              size="md"
              className="w-full"
              {...form.getInputProps('confirmPassword')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              loading={isEditing}
              disabled={isEditing}
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
