import { AppLayout } from '@/components/AppLayout';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Image, Select, TextInput, rem } from '@mantine/core';
import { clientTypeArray } from '@/lib/clientTypeArabicNames';
import { useBranches } from '@/hooks/useBranches';
import { useClientDetails } from '@/hooks/useClientDetails';
import { IMAGE_BASE_URL } from '@/api';

export const ShowClient = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: branches } = useBranches({ size: 200 });
  const {
    data: clientDetails,
    isLoading,
    isError,
  } = useClientDetails(parseInt(id));

  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));
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
        <h1 className="text-3xl font-semibold">اضافة عميل</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <Select
          searchable
          label="الفرع"
          placeholder="اختار الفرع"
          data={transformedBranches}
          value={clientDetails?.data.branch.id.toString()}
          disabled
        />
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          value={clientDetails?.data.name}
          disabled
        />
        <Select
          label="نوع الحساب"
          placeholder="اختار النوع"
          data={clientTypeArray}
          value={clientDetails?.data.role}
          disabled
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          value={clientDetails?.data.phone}
          disabled
        />
        <div className="col-span-2">
          <Image
            fit="contain"
            mah={rem(400)}
            radius="md"
            src={IMAGE_BASE_URL + (clientDetails?.data.avatar || '')}
          />
        </div>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={() => {
            navigate(`/clients/${id}/edit`);
          }}
        >
          تعديل
        </Button>
        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="outline"
          onClick={() => {
            navigate('/clients');
          }}
        >
          الغاء
        </Button>
      </div>
    </AppLayout>
  );
};
