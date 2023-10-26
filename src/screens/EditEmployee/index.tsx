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
import { useNavigate, useParams } from 'react-router-dom';
import { editEmployeeSchema } from './schema';
import { useEmployeeDetails } from '@/hooks/useEmployeeDetails';
import { useEffect } from 'react';
import { rolesArray } from '@/lib/rolesArabicNames';
import {
  permissionsArabicNames,
  permissionsArray,
} from '@/lib/persmissionArabicNames';
import { useRepositories } from '@/hooks/useRepositories';
import { useBranches } from '@/hooks/useBranches';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  EditEmployeePayload,
  editEmployeeService,
} from '@/services/editEmployee';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const EditEmployee = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: employeeDetails, isLoading, isError } = useEmployeeDetails(id);
  const { data: repositories } = useRepositories({ size: 200 });
  const { data: branches } = useBranches({ size: 200 });

  const form = useForm({
    validate: zodResolver(editEmployeeSchema),
    initialValues: {
      username: '',
      name: '',
      phone: '',
      salary: '',
      branch: '',
      repository: '',
      role: '',
      permissions: [''],
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (employeeDetails) {
      const userAssignedPermissions = employeeDetails.data.permissions.map(
        (permission) =>
          permissionsArabicNames[
            permission as unknown as keyof typeof permissionsArabicNames
          ]
      );

      form.setValues({
        username: employeeDetails.data.username,
        name: employeeDetails.data.name,
        phone: employeeDetails.data.phone,
        salary: employeeDetails.data.salary,
        branch: employeeDetails.data.branch.name,
        repository: employeeDetails.data.repository.name,
        role: employeeDetails.data.role,
        permissions: userAssignedPermissions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeDetails]);

  const transformedRepositories = repositories?.data?.map((repository) => ({
    value: repository.id,
    label: repository.name,
  }));

  const transformedBranches = branches?.data?.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const queryClient = useQueryClient();
  const { mutate: editEmployeeAction, isLoading: isEditing } = useMutation({
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
    }: EditEmployeePayload) => {
      return editEmployeeService({
        data: {
          branchID,
          name,
          password,
          permissions,
          phone,
          repositoryID,
          role,
          salary,
          username,
        },
        id,
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

  type PermissionTranslation = Record<string, string>;

  const permissionsArabicToEnglish: PermissionTranslation = {
    'إضافة طلب للسائق': 'ADD_ORDER_TO_DRIVER',
    'إضافة صفحة': 'ADD_PAGE',
    'إضافة طلب': 'ADD_ORDER',
    'إضافة عميل': 'ADD_CLIENT',
    'تعديل اسم العميل': 'EDIT_CLIENT_NAME',
    'تعديل إجمالي مبلغ الطلب': 'EDIT_ORDER_TOTAL_AMOUNT',
    'تغيير حالة الطلب': 'CHANGE_ORDER_STATUS',
    'تغيير حالة الطلب المغلق': 'CHANGE_CLOSED_ORDER_STATUS',
    'قفل حالة الطلب': 'LOCK_ORDER_STATUS',
    'حذف الأسعار': 'DELETE_PRICES',
    'حذف الطلبات': 'DELETE_ORDERS',
    'حذف التقارير': 'DELETE_REPORTS',
    'حذف تقارير الشركة': 'DELETE_COMPANY_REPORTS',
    'حذف تقارير المستودعات': 'DELETE_REPOSITORIES_REPORTS',
    'حذف تقارير الحكومة': 'DELETE_GOVERNMENT_REPORTS',
    'حذف تقارير السائق': 'DELETE_DRIVER_REPORTS',
  };

  function getEnglishLabel(arabicLabel: string): string {
    return permissionsArabicToEnglish[arabicLabel] || '';
  }

  const handleSubmit = (values: z.infer<typeof editEmployeeSchema>) => {
    const selectedBranch = branches?.data?.find(
      (branch) => branch.name === values.branch
    );

    const selectedRepository = repositories?.data?.find(
      (repository) => repository.name === values.repository
    );

    const selectedPermissions = values.permissions.map(
      (permissionArabicLabel) => getEnglishLabel(permissionArabicLabel)
    );

    if (!selectedBranch) {
      form.setFieldError('branch', 'الفرع غير موجود');
      return;
    }

    if (!selectedRepository) {
      form.setFieldError('repository', 'المخزن غير موجود');
      return;
    }

    const hasPermissionsChanged =
      employeeDetails?.data.permissions.join() !== selectedPermissions.join();

    editEmployeeAction({
      branchID: selectedBranch.id,
      name: values.name,
      password: values.password || undefined,
      permissions: hasPermissionsChanged
        ? (values.permissions as unknown as EditEmployeePayload['permissions'])
        : (employeeDetails?.data
            .permissions as unknown as EditEmployeePayload['permissions']),
      phone: values.phone,
      repositoryID: selectedRepository.id,
      role: values.role as unknown as EditEmployeePayload['role'],
      salary: parseInt(values.salary, 10),
      username: values.username,
    });
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
          {...form.getInputProps('repository')}
        />
        <Select
          label="الادوار"
          placeholder="اختار الادوار"
          data={rolesArray}
          {...form.getInputProps('role')}
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
        <Button type="reset" fullWidth mt="xl" size="md" variant="outline">
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
