import { AppLayout } from '@/components/AppLayout';
import { useStoreDetails } from '@/hooks/useStoreDetails';
import { Button, Grid, Select, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editProductSchema } from './schema';
import { z } from 'zod';
import { useEffect } from 'react';
import { useClients } from '@/hooks/useClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditStorePayload, editStoreService } from '@/services/editStore';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

const EditStore = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const { data: clients } = useClients({ size: 200 });
  const clientOptions = clients?.data.map((client) => ({
    label: client.name,
    value: client.id,
  }));
  const { data: storeDetails, isLoading, isError } = useStoreDetails(id);
  const form = useForm({
    validate: zodResolver(editProductSchema),
    initialValues: {
      name: '',
      notes: '',
      client: '',
    },
  });

  useEffect(() => {
    if (storeDetails) {
      form.setValues({
        name: storeDetails.data.name,
        notes: storeDetails.data.notes,
        client: storeDetails.data.client.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeDetails]);

  const { mutate: editProductAction, isLoading: isEditting } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditStorePayload }) => {
      return editStoreService({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stores'],
      });
      toast.success('تم تعديل المتجر بنجاح');
      navigate('/stores');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء تعديل المتجر');
    },
  });

  const handeSubmit = (values: z.infer<typeof editProductSchema>) => {
    editProductAction({
      id,
      data: {
        clientID: values.client,
        name: values.name,
        notes: values.notes,
      },
    });
  };

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4 mb-6">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/stores');
          }}
        />
        <h1 className="text-3xl font-semibold">
          تفاصيل المتجر {storeDetails?.data.name}
        </h1>
      </div>
      <form onSubmit={form.onSubmit(handeSubmit)}>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="اسم المتجر" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="العميل"
              searchable
              data={clientOptions}
              {...form.getInputProps('client')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <Textarea
              label="الملاحظات"
              rows={10}
              maxRows={10}
              {...form.getInputProps('notes')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              loading={isEditting}
              disabled={isEditting}
              fullWidth
              type="submit"
            >
              تعديل
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              onClick={() => {
                navigate('/stores');
              }}
              fullWidth
              variant="outline"
            >
              العودة
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};

export default EditStore;
