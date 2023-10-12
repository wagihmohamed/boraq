import { AppLayout } from '@/components/AppLayout';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { repositoriesBranches } from '@/mockup/repositories';

export const ShowRepository = () => {
  const navigate = useNavigate();

  const repositoryData = {
    name: 'مخزن البصرة',
    branch: repositoriesBranches[0],
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
        <h1 className="text-3xl font-semibold">تعديل مخزن</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          value={repositoryData.name}
          disabled
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={repositoriesBranches}
          value={repositoryData.branch}
          disabled
        />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          onClick={() => {
            navigate('/repositories/1/edit');
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
            navigate('/repositories');
          }}
        >
          الغاء
        </Button>
      </div>
    </AppLayout>
  );
};
