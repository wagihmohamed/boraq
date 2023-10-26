import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addClientSchema } from './schema';
import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import {
  clientTypeArabicNames,
  clientTypeArray,
} from '@/lib/clientTypeArabicNames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateClientPayload,
  createClientsService,
} from '@/services/createClients';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { z } from 'zod';
import { useBranches } from '@/hooks/useBranches';

export const AddClient = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: branches } = useBranches({ size: 200 });

  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const form = useForm({
    validate: zodResolver(addClientSchema),
    initialValues: {
      name: '',
      phone: '',
      branch: '',
      type: '' as (typeof clientTypeArabicNames)['CLIENT'],
      // image: [] as FileWithPath[],
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: createClientAction, isLoading } = useMutation({
    mutationFn: ({
      accountType,
      branchID,
      name,
      password,
      phone,
      token,
    }: CreateClientPayload) => {
      return createClientsService({
        accountType,
        branchID,
        name,
        password,
        phone,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
      toast.success('تم اضافة العميل بنجاح');
      navigate('/clients');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addClientSchema>) => {
    createClientAction({
      accountType: values.type as keyof typeof clientTypeArabicNames,
      branchID: values.branch,
      name: values.name,
      password: values.password,
      phone: values.phone,
      token: 'hi',
    });
  };

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
        <Select
          searchable
          label="الفرع"
          placeholder="اختار الفرع"
          data={transformedBranches}
          {...form.getInputProps('branch')}
        />
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('name')}
        />
        <Select
          label="نوع الحساب"
          placeholder="اختار النوع"
          data={clientTypeArray}
          {...form.getInputProps('type')}
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('phone')}
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
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          fullWidth
          mt="xl"
          size="md"
        >
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
