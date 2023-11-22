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
import { useNavigate } from 'react-router-dom';
import { addEmployeeSchema } from './schema';
import { useBranches } from '@/hooks/useBranches';
import { useRepositories } from '@/hooks/useRepositories';
import { rolesArray } from '@/lib/rolesArabicNames';
import { permissionsArray } from '@/lib/persmissionArabicNames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployeeService } from '@/services/createEmployee';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { FileWithPath } from '@mantine/dropzone';
import { ImageUploader } from '@/components/CustomDropZone';

export const AddEmployee = () => {
  const navigate = useNavigate();
  const { data: branches = { data: [] } } = useBranches({ size: 200 });
  const { data: repositories = { data: [] } } = useRepositories({ size: 200 });
  const form = useForm({
    validate: zodResolver(addEmployeeSchema),
    initialValues: {
      username: '',
      name: '',
      phone: '',
      salary: '',
      branch: '',
      store: '',
      roles: '',
      permissions: [],
      password: '',
      confirmPassword: '',
      avatar: [] as unknown as FileWithPath[],
    },
  });

  const transformedBranches = branches.data?.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const transformedRepositories = repositories.data?.map((repository) => ({
    value: repository.id.toString(),
    label: repository.name,
  }));
  const queryClient = useQueryClient();
  const { mutate: createBranchAction, isLoading } = useMutation({
    mutationFn: (data: FormData) => {
      return createEmployeeService(data);
    },
    onSuccess: () => {
      toast.success('تم اضافة الموظف بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      navigate('/employees');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addEmployeeSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('username', values.username);
    formData.append('phone', values.phone);
    formData.append('salary', values.salary);
    formData.append('branchID', values.branch);
    formData.append('repositoryID', values.store);
    formData.append('role', values.roles);
    formData.append('password', values.password);
    formData.append('avatar', values.avatar[0]);
    formData.append('permissions', JSON.stringify(values.permissions));
    createBranchAction(formData);
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/employees');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة موظف</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="lg">
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
              label="الأجرة"
              type="number"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('salary')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="الفرع"
              placeholder="اختار الفرع"
              data={transformedBranches}
              {...form.getInputProps('branch')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المخزن"
              placeholder="اختار المخزن"
              data={transformedRepositories}
              {...form.getInputProps('store')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="الادوار"
              placeholder="اختار الادوار"
              data={rolesArray}
              {...form.getInputProps('roles')}
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
              loading={isLoading}
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
