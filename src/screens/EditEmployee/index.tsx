import { AppLayout } from '@/components/AppLayout';
import {
  Button,
  Grid,
  MultiSelect,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editEmployeeSchema } from './schema';
import { useEmployeeDetails } from '@/hooks/useEmployeeDetails';
import { useEffect } from 'react';
import { rolesArray } from '@/lib/rolesArabicNames';
import { permissionsArray } from '@/lib/persmissionArabicNames';
import { useRepositories } from '@/hooks/useRepositories';
import { useBranches } from '@/hooks/useBranches';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmployeeService } from '@/services/editEmployee';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';
import { useTenants } from '@/hooks/useTenants';

export const EditEmployee = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const {
    data: employeeDetails,
    isLoading,
    isError,
  } = useEmployeeDetails(parseInt(id));
  const { data: repositories } = useRepositories({ size: 200 });
  const { data: branches } = useBranches({ size: 200 });
  const { data: tenants = { data: [] } } = useTenants({ size: 200 });

  const form = useForm({
    validate: zodResolver(editEmployeeSchema),
    initialValues: {
      username: '',
      name: '',
      phone: '',
      salary: 0,
      branch: '',
      repository: '',
      role: '',
      permissions: [] as string[],
      password: '',
      confirmPassword: '',
      companyID: '',
      avatar: [] as unknown as FileWithPath[],
      deliveryCost: 0,
    },
  });

  useEffect(() => {
    if (employeeDetails) {
      const avatarAddress = employeeDetails.data.avatar;
      form.setValues({
        username: employeeDetails.data.username,
        name: employeeDetails.data.name,
        phone: employeeDetails.data.phone,
        salary: employeeDetails.data.salary,
        branch: employeeDetails.data.branch?.id.toString(),
        repository: employeeDetails.data.repository?.id.toString(),
        role: employeeDetails.data.role,
        companyID: employeeDetails.data.company.id.toString(),
        permissions: employeeDetails.data?.permissions,
        avatar: [avatarAddress] as unknown as FileWithPath[],
        deliveryCost: employeeDetails.data.deliveryCost,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeDetails]);

  const transformedRepositories = repositories?.data?.map((repository) => ({
    value: repository.id.toString(),
    label: repository.name,
  }));

  const transformedBranches = branches?.data?.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const transformedTenants = tenants.data?.map((tenant) => ({
    value: tenant.id.toString(),
    label: tenant.name,
  }));

  const queryClient = useQueryClient();
  const { mutate: editEmployeeAction, isLoading: isEditing } = useMutation({
    mutationFn: (data: FormData) => {
      return editEmployeeService({
        data,
        id: parseInt(id),
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل الموظف بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      navigate('/employees');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof editEmployeeSchema>) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('salary', String(values.salary));
    formData.append('branchID', values.branch);
    formData.append('repositoryID', values.repository);
    formData.append('role', values.role);
    formData.append('companyID', values.companyID);
    formData.append('permissions', JSON.stringify(values.permissions));
    if (values.password) {
      formData.append('password', values.password);
    }
    if (values.avatar[0] instanceof File) {
      formData.append('avatar', (values?.avatar[0] as File) || '');
    }
    formData.append('deliveryCost', String(values.deliveryCost));
    editEmployeeAction(formData);
  };

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/employees');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل موظف</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
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
            <TextInput
              label="رقم الهاتف"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('phone')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الراتب"
              type="number"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('salary')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="أجرة التوصيل"
              type="number"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('deliveryCost')}
            />
          </Grid.Col>
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
            <Select
              searchable
              label="المخزن"
              placeholder="اختار المخزن"
              data={transformedRepositories}
              limit={100}
              {...form.getInputProps('repository')}
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
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="الادوار"
              placeholder="اختار الادوار"
              data={rolesArray}
              {...form.getInputProps('role')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <MultiSelect
              label="الصلاحيات"
              placeholder="اختار الصلاحيات"
              data={permissionsArray}
              {...form.getInputProps('permissions')}
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
              loading={isEditing}
              disabled={isEditing || !form.isDirty}
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
              onClick={() => {
                form.reset();
                navigate('/employees');
              }}
              type="reset"
              fullWidth
              mt="xl"
              size="md"
              variant="outline"
            >
              الغاء
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
