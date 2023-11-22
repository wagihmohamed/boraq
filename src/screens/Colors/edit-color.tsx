import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { IconPencil } from '@tabler/icons-react';
import { FormEvent, useState } from 'react';
import { editColorService } from '@/services/editColor';
import { SketchPicker } from 'react-color';

export const EditColor = ({
  colorId,
  title,
}: {
  colorId: number;
  title: string;
}) => {
  const [colorTitle, setColorTitle] = useState(title);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: editColor, isLoading } = useMutation({
    mutationFn: ({ id, title }: { title: string; id: number }) =>
      editColorService({ id, title }),
    onSuccess: () => {
      toast.success('تم تعديل اللون بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['colors'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء تعديل اللون');
    },
  });

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editColor({ title: colorTitle, id: colorId });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="تعديل اللون" centered>
        <form onSubmit={handleEdit}>
          <SketchPicker
            color={colorTitle}
            onChangeComplete={(color) => setColorTitle(color.hex)}
          />
          <TextInput
            value={colorTitle}
            onChange={(event) => setColorTitle(event.currentTarget.value)}
            label="اللون"
            required
            placeholder="اللون"
            className="mb-4"
          />
          <div className="mt-4 flex items-center gap-4">
            <Button
              loading={isLoading}
              disabled={isLoading || !colorTitle}
              type="submit"
              variant="filled"
            >
              تعديل
            </Button>
            <Button variant="outline" onClick={close} className="mr-4">
              إلغاء
            </Button>
          </div>
        </form>
      </Modal>

      <IconPencil
        onClick={open}
        className="text-yellow-200 cursor-pointer"
        size={24}
      />
    </>
  );
};
