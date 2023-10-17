import { AppLayout } from '@/components/AppLayout';
import { useEmployeeDetails } from '@/hooks/useEmployeeDetails';
import { permissionsArray } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Autocomplete, Button, MultiSelect, TextInput } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ShowEmployee = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: employeeData, isError, isLoading } = useEmployeeDetails(id);

  const userRoles = employeeData?.data.role
    ? rolesArabicNames[employeeData?.data.role]
    : 'لا يوجد';

  const userPermissions = permissionsArray
    .filter(
      (permission) => employeeData?.data.permissions?.includes(permission.value)
    )
    .map((permission) => permission.label);

  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/employees');
          }}
        />
        <h1 className="text-3xl font-semibold">بيانات موظف</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData?.data.name}
          disabled
        />
        <TextInput
          label="اسم المستخدم"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData?.data.username}
          disabled
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData?.data.phone}
          disabled
        />
        <TextInput
          label="الأجرة"
          type="number"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData?.data.salary}
          disabled
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          value={employeeData?.data.branch.name || ''}
          disabled
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          value={employeeData?.data.repository.name || ''}
          disabled
        />
        <Autocomplete
          label="الوظيفة"
          placeholder="اختار الوظيفة"
          value={userRoles}
          disabled
        />
        <MultiSelect
          label="الصلاحيات"
          value={userPermissions}
          placeholder="اختار الصلاحيات"
          disabled
        />
        <Button
          type="submit"
          onClick={() => {
            navigate(`/employees/${id}/edit`);
          }}
          fullWidth
          mt="xl"
          size="md"
        >
          تعديل
        </Button>
        <Button
          onClick={() => {
            navigate('/employees');
          }}
          type="submit"
          variant="outline"
          fullWidth
          mt="xl"
          size="md"
        >
          العودة
        </Button>
      </div>
    </AppLayout>
  );
};
