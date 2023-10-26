import { AppLayout } from '@/components/AppLayout';
import {
  Autocomplete,
  Button,
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
import {
  CreateEmployeePayload,
  createEmployeeService,
} from '@/services/createEmployee';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';

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
    },
  });

  const transformedBranches = branches.data?.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const transformedRepositories = repositories.data?.map((repository) => ({
    value: repository.id,
    label: repository.name,
  }));
  const queryClient = useQueryClient();
  const { mutate: createBranchAction, isLoading } = useMutation({
    mutationFn: ({
      branchID,
      name,
      password,
      permissions,
      phone,
      repositoryID,
      role,
      salary,
      username,
    }: CreateEmployeePayload) => {
      return createEmployeeService({
        branchID,
        name,
        password,
        permissions,
        phone,
        repositoryID,
        role,
        salary,
        username,
      });
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
    const selectedBranch = branches.data?.find(
      (branch) => branch.name === values.branch
    );
    const selectedRepository = repositories.data?.find(
      (repository) => repository.name === values.store
    );

    if (!selectedBranch) {
      form.setFieldError('branch', 'الفرع غير موجود');
      return;
    }
    if (!selectedRepository) {
      form.setFieldError('store', 'المخزن غير موجود');
      return;
    }
    createBranchAction({
      branchID: selectedBranch.id,
      name: values.name,
      password: values.password,
      permissions:
        values.permissions as unknown as CreateEmployeePayload['permissions'],
      phone: values.phone,
      repositoryID: selectedRepository.id,
      role: values.roles as unknown as CreateEmployeePayload['role'],
      salary: parseInt(values.salary, 10),
      username: values.username,
    });
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
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
      >
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="اسم المستخدم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('username')}
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('phone')}
        />
        <TextInput
          label="الأجرة"
          type="number"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('salary')}
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={transformedBranches}
          {...form.getInputProps('branch')}
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          data={transformedRepositories}
          {...form.getInputProps('store')}
        />
        <Select
          label="الادوار"
          placeholder="اختار الادوار"
          data={rolesArray}
          {...form.getInputProps('roles')}
        />
        <MultiSelect
          label="الصلاحيات"
          placeholder="اختار الصلاحيات"
          data={permissionsArray}
          {...form.getInputProps('permissions')}
        />
        <PasswordInput
          label="كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="تأكيد كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
          {...form.getInputProps('confirmPassword')}
        />
        <Button loading={isLoading} type="submit" fullWidth mt="xl" size="md">
          اضافة
        </Button>
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
      </form>
    </AppLayout>
  );
};
