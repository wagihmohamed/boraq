import { AppLayout } from '@/components/AppLayout';
import {
  Autocomplete,
  Button,
  MultiSelect,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addEmployeeSchema } from './schema';
import { employeePermissions, employeeRoles } from '@/mockup/employees';
import { repositoriesBranches } from '@/mockup/repositories';

export const AddEmployee = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(addEmployeeSchema),
    initialValues: {
      name: '',
      phone: '',
      salary: '',
      branch: '',
      store: '',
      job: '',
      roles: [],
      permissions: [],
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = () => {};

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
          data={['بغداد', 'البصرة', 'النجف']}
          {...form.getInputProps('branch')}
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          data={repositoriesBranches}
          {...form.getInputProps('store')}
        />
        <Autocomplete
          label="الوظيفة"
          placeholder="اختار الوظيفة"
          data={employeeRoles}
          {...form.getInputProps('job')}
        />
        <MultiSelect
          label="الادوار"
          placeholder="اختار الادوار"
          data={employeeRoles}
          {...form.getInputProps('roles')}
        />
        <MultiSelect
          label="الصلاحيات"
          placeholder="اختار الصلاحيات"
          data={employeePermissions}
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
        <Button type="submit" fullWidth mt="xl" size="md">
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
