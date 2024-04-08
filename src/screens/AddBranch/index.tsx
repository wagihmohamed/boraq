import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addBranchSchema } from './schema';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateBranchPayload,
  createBranchService,
} from '@/services/createBranchService';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { z } from 'zod';
import { governorateArray } from '@/lib/governorateArabicNames ';

export const AddBranch = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createBranch, isLoading } = useMutation({
    mutationFn: ({ governorate, name }: CreateBranchPayload) => {
      return createBranchService({
        governorate,
        name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['branches'],
      });
      toast.success('تم اضافة الفرع بنجاح');
      navigate('/branches');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const form = useForm({
    validate: zodResolver(addBranchSchema),
    initialValues: {
      location: '',
      name: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof addBranchSchema>) => {
    const enLocation = governorateArray.find(
      (governorate) => governorate.label === values.location
    );
    if (!enLocation) {
      form.setFieldError('location', 'الرجاء اختيار الفرع');
      return;
    }
    createBranch({
      governorate: enLocation.value,
      name: values.name,
    });
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
          label="المحافظة"
          placeholder="اختار المحافظة"
          data={governorateArray}
          {...form.getInputProps('location')}
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
            navigate('/branches');
          }}
        >
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
