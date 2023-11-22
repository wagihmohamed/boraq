import { IMAGE_BASE_URL } from '@/api';
import { AppLayout } from '@/components/AppLayout';
import { useEmployeeDetails } from '@/hooks/useEmployeeDetails';
import { permissionsArray } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import {
  Autocomplete,
  Button,
  Grid,
  Image,
  MultiSelect,
  TextInput,
  rem,
} from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ShowEmployee = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const {
    data: employeeData,
    isError,
    isLoading,
  } = useEmployeeDetails(parseInt(id));

  const userRoles = employeeData?.data.role
    ? rolesArabicNames[employeeData?.data.role]
    : 'لا يوجد';

  const userPermissions = permissionsArray
    .filter(
      (permission) =>
        employeeData?.data.permissions?.includes(permission.value as never)
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
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="الاسم"
            placeholder=""
            size="md"
            className="w-full"
            value={employeeData?.data.name}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="اسم المستخدم"
            placeholder=""
            size="md"
            className="w-full"
            value={employeeData?.data.username}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="رقم الهاتف"
            placeholder=""
            size="md"
            className="w-full"
            value={employeeData?.data.phone}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="الأجرة"
            type="number"
            placeholder=""
            size="md"
            className="w-full"
            value={employeeData?.data.salary}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Autocomplete
            label="الفرع"
            placeholder="اختار الفرع"
            value={employeeData?.data.branch.name || ''}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Autocomplete
            label="المخزن"
            placeholder="اختار المخزن"
            value={employeeData?.data.repository.name || ''}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Autocomplete
            label="الوظيفة"
            placeholder="اختار الوظيفة"
            value={userRoles}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <MultiSelect
            label="الصلاحيات"
            value={userPermissions}
            placeholder="اختار الصلاحيات"
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, xs: 12 }}>
          <Image
            fit="contain"
            mah={rem(400)}
            radius="md"
            src={IMAGE_BASE_URL + (employeeData?.data.avatar || '')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
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
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};
