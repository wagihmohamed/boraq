import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addRepositorySchema } from './schema';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { repositoriesBranches } from '@/mockup/repositories';

export const AddRepository = () => {
  const navigate = useNavigate();

  const form = useForm({
    validate: zodResolver(addRepositorySchema),
    initialValues: {
      name: '',
      branch: '',
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
        <h1 className="text-3xl font-semibold">اضافة مخزن</h1>
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
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={repositoriesBranches}
          {...form.getInputProps('branch')}
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
