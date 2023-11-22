import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addRepositorySchema } from './schema';
import { Autocomplete, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateRepositoryPayload,
  createRepositoryService,
} from '@/services/createRepository';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { z } from 'zod';
import { useBranches } from '@/hooks/useBranches';

export const AddRepositoryScreen = () => {
  const navigate = useNavigate();
  const {
    data: branches = {
      data: [],
    },
  } = useBranches({ size: 200 });
  const queryClient = useQueryClient();
  const { mutate: createRepository, isLoading } = useMutation({
    mutationFn: ({ branchID, name }: CreateRepositoryPayload) => {
      return createRepositoryService({ branchID, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repositories'],
      });
      toast.success('تم اضافة المخزن بنجاح');
      navigate('/repositories');
    },
    onError: (data: AxiosError<APIError>) => {
      toast.error(data.response?.data.message || 'حدث خطأ ما');
    },
  });

  const form = useForm({
    validate: zodResolver(addRepositorySchema),
    initialValues: {
      name: '',
      branch: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof addRepositorySchema>) => {
    const selectedBranch = branches.data.find(
      (branch) => branch.name === values.branch
    );
    if (!selectedBranch) {
      form.setFieldError('branch', 'الفرع غير موجود');
      return;
    }
    createRepository({
      branchID: selectedBranch.id,
      name: values.name,
    });
  };

  const transformedBranches = branches.data.map((branch) => ({
    label: branch.name,
    value: branch.id.toString(),
  }));

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/repositories');
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
          data={transformedBranches}
          {...form.getInputProps('branch')}
        />
        <Button loading={isLoading} type="submit" fullWidth mt="xl" size="md">
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
