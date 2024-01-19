import { AppLayout } from '@/components/AppLayout';
import { Button, MultiSelect, Select, TextInput } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editLocationSchema } from './schema';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useBranches } from '@/hooks/useBranches';
import { useEmployees } from '@/hooks/useEmployees';
import {
  governorateArabicNames,
  governorateArray,
} from '@/lib/governorateArabicNames ';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { useLocationDetails } from '@/hooks/useLocationDetails';
import { useEffect } from 'react';
import {
  EditLocationPayload,
  editLocationService,
} from '@/services/editLocation';

export const EditLocation = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: locationDetails,
    isError,
    isLoading,
  } = useLocationDetails(parseInt(id));
  const form = useForm({
    validate: zodResolver(editLocationSchema),
    initialValues: {
      name: '',
      governorate: '',
      branch: '',
      deliveryAgentsIDs: [''],
    },
  });
  const {
    data: branches = {
      data: [],
    },
  } = useBranches({ size: 1000 });

  const {
    data: employees = {
      data: [],
    },
  } = useEmployees({ size: 1000, roles: ['DELIVERY_AGENT'] });

  useEffect(() => {
    const transformedDeliveries = locationDetails?.data?.deliveryAgents.map(
      (delivery) => delivery.id.toString()
    );
    form.setValues({
      name: locationDetails?.data.name || '',
      governorate: locationDetails?.data?.governorate || '',
      branch: locationDetails?.data?.branch.id.toString() || '',
      deliveryAgentsIDs: transformedDeliveries || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationDetails]);

  const deliveryAgents = employees.data.map((employee) => ({
    value: employee.id.toString(),
    label: employee.name,
  }));

  const transformedBranches = branches.data?.map((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const { mutate: editLocationAction, isLoading: isEditing } = useMutation({
    mutationFn: ({
      branchID,
      deliveryAgentsIDs,
      governorate,
      name,
    }: EditLocationPayload) => {
      return editLocationService({
        data: {
          branchID,
          deliveryAgentsIDs,
          governorate,
          name,
        },
        id: parseInt(id),
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل المنطقة بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      });
      navigate('/locations');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof editLocationSchema>) => {
    editLocationAction({
      branchID: Number(values.branch),
      deliveryAgentsIDs: values.deliveryAgentsIDs.map((id) => Number(id)),
      governorate: values.governorate as keyof typeof governorateArabicNames,
      name: values.name,
    });
  };

  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/locations');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل المنطقة</h1>
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
          limit={100}
          data={transformedBranches}
        />
        <MultiSelect
          label="المندوبين"
          data={deliveryAgents}
          limit={100}
          searchable
          {...form.getInputProps('deliveryAgentsIDs')}
        />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          disabled={isEditing}
          loading={isEditing}
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
            navigate('/locations');
          }}
        >
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
