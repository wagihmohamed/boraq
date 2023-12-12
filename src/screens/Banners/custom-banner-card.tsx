import { IMAGE_BASE_URL } from '@/api';
import { buttonVariants } from '@/components/ui/button';
import { APIError } from '@/models';
import { deleteBannerService } from '@/services/deleteBanner';
import { Banner } from '@/services/getBannersService';
import { Card, Image, Text, Button, Group, rem } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

interface CustomTenantCardProps extends Banner {}

export const CustomBannerCard = ({
  image,
  title,
  id,
  content,
  createdAt,
  url,
}: CustomTenantCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleNavigate = () => {
    navigate(`/banners/${id}/show`);
  };
  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: (id: number) => deleteBannerService({ id }),
    onSuccess: () => {
      toast.success('تم مسح البانر بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['banners'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={IMAGE_BASE_URL + image}
          className="aspect-square"
          fit="contain"
          fallbackSrc="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt={title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <div>
          <Text size="md" fw={500}>
            {title || 'لا يوجد'}
          </Text>
          <Text size="sm" c="dimmed" fw={400}>
            تم الانشاء في: {format(parseISO(createdAt), 'yyyy-MM-dd HH:mm')}
          </Text>
        </div>
      </Group>

      <Text size="sm" c="dimmed" truncate>
        {content}
      </Text>
      <Text mt={10} size="sm" c="dimmed">
        العنوان:{' '}
        <Link
          target="blank"
          className={buttonVariants({ variant: 'ghost' })}
          to={url}
        >
          {url}
        </Link>
      </Text>
      <Group mt="md" grow>
        <Button
          fullWidth
          onClick={handleDelete}
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          radius="md"
          disabled={isLoading}
          loading={isLoading}
        >
          مسح
        </Button>
        <Button
          fullWidth
          onClick={handleNavigate}
          variant="outline"
          radius="md"
          leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
        >
          تعديل
        </Button>
      </Group>
    </Card>
  );
};
