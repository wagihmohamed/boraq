import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Grid, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { addBannerModalSchema } from './AddBannerModal.schema';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBannerService } from '@/services/createBanner';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const AddBannerModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      image: [] as unknown as FileWithPath[],
      url: '',
    },
    validate: zodResolver(addBannerModalSchema),
  });

  const { mutate: createBanner, isLoading } = useMutation({
    mutationFn: (data: FormData) => createBannerService(data),
    onSuccess: () => {
      toast.success('تم اضافة البانر بنجاح');
      close();
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['banners'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addBannerModalSchema>) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('url', values.url);
    formData.append('image', values.image[0]);
    createBanner(formData);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="60%"
        title="اضافة بانر"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <TextInput
                label="العنوان"
                placeholder="العنوان"
                {...form.getInputProps('title')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <TextInput
                label="اللينك"
                placeholder="اللينك"
                {...form.getInputProps('url')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12 }}>
              <Textarea
                label="المحتوي"
                placeholder="المحتوي"
                rows={5}
                {...form.getInputProps('content')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12 }}>
              <ImageUploader
                image={form.values.image}
                onDrop={(files) => {
                  form.setFieldValue('image', files);
                }}
                onDelete={() => {
                  form.setFieldValue('image', []);
                }}
              />
              {form.values.image.length === 0 && (
                <div className="text-red-500">الصورة مطلوبة</div>
              )}
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
              >
                اضافة
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <Button type="submit" variant="outline" fullWidth>
                الغاء
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Button onClick={open} size="lg" variant="outline">
        اضافة بانر
      </Button>
    </>
  );
};
