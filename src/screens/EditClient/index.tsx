import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { editClientSchema } from './schema';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';

export const EditClient = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(editClientSchema),
    initialValues: {
      name: 'محمد علي',
      phone: '012190212',
      branch: 'بغداد',
      type: 'عميل',
      image: [
        'https://resources.premierleague.com/photos/2023/10/13/f9d7b29a-8366-406a-983a-60e561c39dff/I3La142d.jpg?width=642&height=362',
      ] as unknown as FileWithPath[],
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
            navigate('/clients');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل عميل</h1>
      </div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
      >
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={['بغداد', 'البصرة', 'النجف']}
          {...form.getInputProps('branch')}
        />
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('name')}
        />
        <Autocomplete
          label="نوع الحساب"
          placeholder="اختار النوع"
          data={['عميل', 'مساعد عميل']}
          {...form.getInputProps('branch')}
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('phone')}
        />
        <div className="col-span-2">
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
        </div>
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
