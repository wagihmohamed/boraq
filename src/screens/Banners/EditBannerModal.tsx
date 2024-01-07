import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Grid, TextInput, Textarea, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BannerSchema } from './BannerSchema';
import { ImageUploader } from '@/components/CustomDropZone';
import { FileWithPath } from '@mantine/dropzone';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { IconEdit } from '@tabler/icons-react';
import { Banner } from '@/services/getBannersService';
import { useEffect } from 'react';
import { editBannerService } from '@/services/editBanner';

interface EditBannerModalProps extends Omit<Banner, 'company' | 'createdAt'> {}

export const EditBannerModal = ({
  image,
  content,
  title,
  url,
  id,
}: EditBannerModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      image: [] as unknown as FileWithPath[],
      url: '',
    },
    validate: zodResolver(BannerSchema),
  });

  useEffect(() => {
    const avatarAddress = image;
    form.setValues({
      title,
      content,
      url,
      image: [avatarAddress] as unknown as FileWithPath[],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, url, image]);

  const { mutate: editBanner, isLoading } = useMutation({
    mutationFn: (data: FormData) => editBannerService({ id, data }),
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

  const handleSubmit = (values: z.infer<typeof BannerSchema>) => {
    if (values.image.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('url', values.url);
    if (values.image[0] instanceof File) {
      formData.append('image', values.image[0]);
    }
    editBanner(formData);
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
                تعديل
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6 }}>
              <Button type="button" onClick={close} variant="outline" fullWidth>
                الغاء
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Button
        fullWidth
        onClick={open}
        variant="outline"
        radius="md"
        leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
      >
        تعديل
      </Button>
    </>
  );
};
