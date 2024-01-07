import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editClientSchema } from './schema';
import { Button, Grid, PasswordInput, Select, TextInput } from '@mantine/core';
import { useBranches } from '@/hooks/useBranches';
import { useClientDetails } from '@/hooks/useClientDetails';
import { useEffect } from 'react';
import { clientTypeArray } from '@/lib/clientTypeArabicNames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { editClientService } from '@/services/editClient';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';
import { useTenants } from '@/hooks/useTenants';

export const EditClient = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: branches } = useBranches({ size: 500 });
  const {
    data: clientDetails,
    isLoading,
    isError,
  } = useClientDetails(parseInt(id));
  const { data: tenants = { data: [] } } = useTenants({ size: 500 });

  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const transformedTenants = tenants.data?.map((tenant) => ({
    value: tenant.id.toString(),
    label: tenant.name,
  }));
  const form = useForm({
    validate: zodResolver(editClientSchema),
    initialValues: {
      name: '',
      phone: '',
      branch: '',
      type: '',
      password: '',
      confirmPassword: '',
      avatar: [] as unknown as FileWithPath[],
      companyID: '',
    },
  });

  useEffect(() => {
    if (clientDetails) {
      const avatarAddress = clientDetails.data.avatar;
      form.setValues({
        name: clientDetails.data.name,
        phone: clientDetails.data.phone,
        branch: clientDetails.data.branch?.id.toString(),
        type: clientDetails.data.role,
        companyID: clientDetails.data.company?.id.toString(),
        avatar: [avatarAddress] as unknown as FileWithPath[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientDetails]);

  const { mutate: editClientAction, isLoading: isEditting } = useMutation({
    mutationFn: (data: FormData) => {
      return editClientService({ id: parseInt(id), data });
    },
    onSuccess: () => {
      toast.success('تم تعديل العميل بنجاح');
      navigate('/clients');
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof editClientSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('branchID', values.branch);
    formData.append('accountType', values.type);
    if (values.password) {
      formData.append('password', values.password);
    }
    formData.append('avatar', values?.avatar[0] || '');
    formData.append('token', '');
    formData.append('companyID', values.companyID);

    editClientAction(formData);
  };

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/clients');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل عميل</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
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
            <Select
              searchable
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
          </Grid.Col>
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
              loading={isEditting}
              disabled={isEditting}
              type="submit"
              fullWidth
              mt="xl"
              size="md"
            >
              تعديل
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
