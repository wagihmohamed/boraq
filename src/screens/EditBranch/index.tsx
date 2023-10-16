import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { editBranchSchema } from './schema';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { fakeBranches } from '@/mockup/fakeBranches';

export const EditBranch = () => {
  const navigate = useNavigate();
  const mockedData = fakeBranches[0];
  const form = useForm({
    validate: zodResolver(editBranchSchema),
    initialValues: {
      location: mockedData.location,
      name: mockedData.name,
      email: mockedData.email,
      phone: mockedData.phone,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = () => {};
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
          data={['بغداد', 'البصرة', 'النجف']}
          {...form.getInputProps('location')}
        />
        <TextInput
          label="البريد الالكتروني"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('phone')}
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          تعديل
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
