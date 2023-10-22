import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { editSizeService } from '@/services/editSize';

export const EditSize = ({
  sizeId,
  title,
}: {
  sizeId: string;
  title: string;
}) => {
  const [sizeTitle, setSizeTitle] = useState(title);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: editSize, isLoading } = useMutation({
    mutationFn: ({ id, title }: { title: string; id: string }) =>
      editSizeService({ id, title }),
    onSuccess: () => {
      toast.success('تم تعديل الحجم بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['sizes'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء تعديل الحجم');
    },
  });

  const handleDelete = () => {
    editSize({
      id: sizeId,
      title: sizeTitle,
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="تعديل المخزن" centered>
        <TextInput
          value={sizeTitle}
          onChange={(event) => setSizeTitle(event.currentTarget.value)}
          label="الحجم"
          required
          placeholder="الحجم"
          className="mb-4"
        />
        <div className="mt-4 flex items-center gap-4">
          <Button
            loading={isLoading}
            disabled={isLoading || !sizeTitle}
            variant="filled"
            onClick={handleDelete}
          >
            تعديل
          </Button>
          <Button variant="outline" onClick={close} className="mr-4">
            إلغاء
          </Button>
        </div>
      </Modal>

      <IconPencil
        onClick={open}
        className="text-yellow-200 cursor-pointer"
        size={24}
      />
    </>
  );
};
