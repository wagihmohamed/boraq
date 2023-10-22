import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { CreateColorPayload, createColorService } from '@/services/createColor';

export const AddColor = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [colorName, setColorName] = useState('');
  const queryClient = useQueryClient();
  const { mutate: addColorAction, isLoading } = useMutation({
    mutationFn: ({ title }: CreateColorPayload) =>
      createColorService({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['colors'],
      });
      toast.success('تم اضافة اللون بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addColorAction({ title: colorName });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="اضافة لون" centered>
        <form onSubmit={handleDelete}>
          <TextInput
            label="اسم اللون"
            placeholder="اسم اللون"
            required
            variant="filled"
            className="mb-4"
            value={colorName}
            onChange={(e) => setColorName(e.currentTarget.value)}
          />
          <div className="mt-4 flex items-center gap-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!colorName || isLoading}
              variant="filled"
            >
              اضافة
            </Button>
            <Button variant="outline" onClick={close} className="mr-4">
              إلغاء
            </Button>
          </div>
        </form>
      </Modal>

      <Button
        rightSection={<IconPlus size={18} />}
        onClick={open}
        className="mb-4 md:mb-8"
      >
        اضافة لون جديد
      </Button>
    </>
  );
};
