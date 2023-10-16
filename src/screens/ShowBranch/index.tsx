import { AppLayout } from '@/components/AppLayout';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { fakeBranches } from '@/mockup/fakeBranches';

export const ShowBranch = () => {
  const navigate = useNavigate();
  const mockedData = fakeBranches[0];
  const branchDetails = {
    location: mockedData.location,
    name: mockedData.name,
    email: mockedData.email,
    phone: mockedData.phone,
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/branches');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة فرع</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          value={branchDetails.name}
          disabled
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={['بغداد', 'البصرة', 'النجف']}
          value={branchDetails.location}
          disabled
        />
        <TextInput
          label="البريد الالكتروني"
          placeholder=""
          size="md"
          className="w-full"
          value={branchDetails.email}
          disabled
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          value={branchDetails.phone}
          disabled
        />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          onClick={() => {
            navigate('/branches/1/edit');
          }}
        >
          تعديل
        </Button>
        <Button
          type="reset"
          fullWidth
          mt="xl"
          size="md"
          variant="outline"
          onClick={() => {
            navigate('/branches');
          }}
        >
          الغاء
        </Button>
      </div>
    </AppLayout>
  );
};
