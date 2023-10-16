import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addClientSchema } from './schema';
import { Autocomplete, Button, PasswordInput, TextInput } from '@mantine/core';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';

export const AddClient = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(addClientSchema),
    initialValues: {
      name: '',
      phone: '',
      branch: '',
      type: '',
      image: [] as FileWithPath[],
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
            navigate('/clients');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة عميل</h1>
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
