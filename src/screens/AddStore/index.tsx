import { AppLayout } from '@/components/AppLayout';
import { TextInput, Grid, Textarea, Button, Select } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { createProductSchema } from './schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStoreService } from '@/services/createStore';
import { useClients } from '@/hooks/useClients';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';

export const AddStore = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    validate: zodResolver(createProductSchema),
    initialValues: {
      name: '',
      notes: '',
      client: '',
      logo: [] as unknown as FileWithPath[],
    },
  });

  const {
    data: clients = {
      data: [],
    },
  } = useClients({ size: 1000, minified: true });
  const clientOptions = clients.data.map((client) => ({
    label: client.name,
    value: client.id.toString(),
  }));

  const { mutate: createStoreAction, isLoading } = useMutation({
    mutationFn: (data: FormData) => {
      return createStoreService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stores'],
      });
      toast.success('تم اضافة المتجر بنجاح');
      navigate('/stores');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof createProductSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('notes', values.notes || '');
    formData.append('clientID', values.client);
    formData.append('logo', values.logo[0]);
    createStoreAction(formData);
  };
  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/stores');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة متجر جديد</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="اسم المتجر" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="العميل"
              data={clientOptions}
              limit={100}
              {...form.getInputProps('client')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <ImageUploader
              image={form.values.logo}
              onDrop={(files) => {
                form.setFieldValue('logo', files);
              }}
              onDelete={() => {
                form.setFieldValue('logo', []);
              }}
              error={!!form.errors.logo}
            />
            {form.errors.logo && (
              <div className="text-red-500">{form.errors.logo}</div>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <Textarea
              label="الملاحظات"
              {...form.getInputProps('notes')}
              rows={10}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              fullWidth
              type="submit"
            >
              اضافة
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
