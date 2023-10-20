import { AppLayout } from '@/components/AppLayout';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Select, TextInput } from '@mantine/core';
import { clientTypeArray } from '@/lib/clientTypeArabicNames';
import { useBranches } from '@/hooks/useBranches';
import { useClientDetails } from '@/hooks/useClientDetails';

export const ShowClient = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: branches } = useBranches();
  const { data: clientDetails, isLoading, isError } = useClientDetails(id);

  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id,
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
          value={clientDetails?.data.branch.id}
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
          value={clientDetails?.data.accountType}
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
        {/* <div className="col-span-2">
          <ImageUploader
            onDrop={(files) => {
              form.setFieldValue('image', files);
            }}
            image={form.values.image || []}
            onDelete={() => {
              form.setFieldValue('image', []);
            }}
            error={!!form.errors.image}
          />
          {form.errors.image && (
            <div className="text-red-500">{form.errors.image}</div>
          )}
        </div> */}
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={() => {
            navigate(`/clients/${id}/edit`);
          }}
        >
          اضافة
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
