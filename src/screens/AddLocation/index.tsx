import { AppLayout } from '@/components/AppLayout';
import { Button, MultiSelect, Select, TextInput } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adddLocationSchema } from './schema';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useBranches } from '@/hooks/useBranches';
import { useEmployees } from '@/hooks/useEmployees';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateLocationPayload,
  createLocationService,
} from '@/services/createLocation';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const AddLocation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    validate: zodResolver(adddLocationSchema),
    initialValues: {
      name: '',
      governorate: '',
      branch: '',
      deliveryAgentsIDs: [],
    },
  });
  const {
    data: branches = {
      data: [],
    },
  } = useBranches({ size: 200 });

  const {
    data: employees = {
      data: [],
    },
  } = useEmployees({ size: 500, roles: ['DELIVERY_AGENT'] });

  const deliveryAgents = employees.data.map((employee) => ({
    value: employee.id.toString(),
    label: employee.name,
  }));

  const transformedBranches = branches.data?.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const { mutate: createLocationAction, isLoading: isCreating } = useMutation({
    mutationFn: ({
      branchID,
      deliveryAgentsIDs,
      governorate,
      name,
    }: CreateLocationPayload) => {
      return createLocationService({
        branchID,
        deliveryAgentsIDs,
        governorate,
        name,
      });
    },
    onSuccess: () => {
      toast.success('تم اضافة المنطقة بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      });
      navigate('/locations');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof adddLocationSchema>) => {
    createLocationAction({
      branchID: Number(values.branch),
      deliveryAgentsIDs: values.deliveryAgentsIDs.map(Number),
      governorate: values.governorate,
      name: values.name,
    });
  };

  return (
    <AppLayout isError={false} isLoading={false}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/locations');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة المنطقة</h1>
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
        <Select
          label="المحافظة"
          {...form.getInputProps('governorate')}
          data={governorateArray}
        />
        <Select
          label="الفرع"
          searchable
          {...form.getInputProps('branch')}
          data={transformedBranches}
        />
        <MultiSelect
          label="المندوبين"
          data={deliveryAgents}
          searchable
          {...form.getInputProps('deliveryAgentsIDs')}
        />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          disabled={isCreating}
          loading={isCreating}
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
            navigate('/locations');
          }}
        >
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
