import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addClientSchema } from './schema';
import { Button, Grid, PasswordInput, Select, TextInput } from '@mantine/core';
import {
  clientTypeArabicNames,
  clientTypeArray,
} from '@/lib/clientTypeArabicNames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientsService } from '@/services/createClients';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { z } from 'zod';
import { useBranches } from '@/hooks/useBranches';
import { FileWithPath } from '@mantine/dropzone';
import { ImageUploader } from '@/components/CustomDropZone';
import { useTenants } from '@/hooks/useTenants';
import { useAuth } from '@/store/authStore';
import { useEffect } from 'react';

export const AddClient = () => {
  const navigate = useNavigate();
  const { role, id: loggedInUserId, companyID: loggedInComapnyId } = useAuth();
  const queryClient = useQueryClient();
  const isAdminOrAdminAssistant =
    role === 'ADMIN' || role === 'ADMIN_ASSISTANT';
  const { data: branches } = useBranches({ size: 500 });
  const { data: tenants = { data: [] } } = useTenants({ size: 500 });

  const transformedTenants = tenants.data?.map((tenant) => ({
    value: tenant.id.toString(),
    label: tenant.name,
  }));
  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const form = useForm({
    validate: zodResolver(addClientSchema),
    initialValues: {
      name: '',
      phone: '',
      branch: '',
      username: '',
      type: '' as (typeof clientTypeArabicNames)['CLIENT'],
      avatar: [] as unknown as FileWithPath[],
      password: '',
      confirmPassword: '',
      companyID: '',
    },
  });

  useEffect(() => {
    if (loggedInUserId) {
      form.setFieldValue('companyID', loggedInComapnyId.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserId]);

  const { mutate: createClientAction, isLoading } = useMutation({
    mutationFn: (data: FormData) => {
      return createClientsService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
      toast.success('تم اضافة العميل بنجاح');
      navigate('/clients');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addClientSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('branchID', values.branch);
    formData.append('role', values.type);
    formData.append('password', values.password);
    formData.append('username', values.username);
    formData.append('avatar', values?.avatar[0] || '');
    if (isAdminOrAdminAssistant) {
      formData.append('companyID', values.companyID);
    } else {
      formData.append('companyID', loggedInComapnyId.toString());
    }
    createClientAction(formData);
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/clients');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة عميل</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="الفرع"
              placeholder="اختار الفرع"
              data={transformedBranches}
              limit={100}
              {...form.getInputProps('branch')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الاسم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="اسم المستخدم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('username')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="نوع الحساب"
              placeholder="اختار النوع"
              data={clientTypeArray}
              {...form.getInputProps('type')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="رقم الهاتف"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('phone')}
            />
            {isAdminOrAdminAssistant && (
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <Select
                  searchable
                  label="الشركة"
                  placeholder="اختار الشركة"
                  data={transformedTenants}
                  limit={100}
                  {...form.getInputProps('companyID')}
                />
              </Grid.Col>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <ImageUploader
              image={form.values.avatar}
              onDrop={(files) => {
                form.setFieldValue('avatar', files);
              }}
              onDelete={() => {
                form.setFieldValue('avatar', []);
              }}
              error={!!form.errors.avatar}
            />
            {form.errors.avatar && (
              <div className="text-red-500">{form.errors.avatar}</div>
            )}
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
                navigate('/clients');
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
