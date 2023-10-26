import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editClientSchema } from './schema';
import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { useBranches } from '@/hooks/useBranches';
import { useClientDetails } from '@/hooks/useClientDetails';
import { useEffect } from 'react';
import {
  clientTypeArabicNames,
  clientTypeArray,
} from '@/lib/clientTypeArabicNames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { EditClientPayload, editClientService } from '@/services/editClient';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const EditClient = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: branches } = useBranches({ size: 200 });
  const { data: clientDetails, isLoading, isError } = useClientDetails(id);

  const transformedBranches = branches?.data.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const form = useForm({
    validate: zodResolver(editClientSchema),
    initialValues: {
      name: '',
      phone: '',
      branch: '',
      type: '',
      password: '',
      confirmPassword: '',
      // image: [
      //   'https://resources.premierleague.com/photos/2023/10/13/f9d7b29a-8366-406a-983a-60e561c39dff/I3La142d.jpg?width=642&height=362',
      // ] as unknown as FileWithPath[],
    },
  });

  useEffect(() => {
    if (clientDetails) {
      form.setValues({
        name: clientDetails.data.name,
        phone: clientDetails.data.phone,
        branch: clientDetails.data.branch.id,
        type: clientDetails.data.accountType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientDetails]);

  const { mutate: editClientAction, isLoading: isEditting } = useMutation({
    mutationFn: ({
      accountType,
      branchID,
      name,
      password,
      phone,
      token,
    }: EditClientPayload) => {
      return editClientService({
        data: {
          accountType,
          branchID,
          name,
          password,
          phone,
          token,
        },
        id,
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل العميل بنجاح');
      navigate('/clients');
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof editClientSchema>) => {
    editClientAction({
      accountType: values.type as keyof typeof clientTypeArabicNames,
      branchID: values.branch,
      name: values.name,
      password:
        values.password && values.password.length > 5
          ? values.password
          : undefined,
      phone: values.phone,
      token: '',
    });
  };

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
        <h1 className="text-3xl font-semibold">تعديل عميل</h1>
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
          searchable
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
          loading={isEditting}
          disabled={isEditting}
          type="submit"
          fullWidth
          mt="xl"
          size="md"
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
            form.reset();
          }}
        >
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
