import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import {
  CreateCategoryPayload,
  createCategoryService,
} from '@/services/createCategory';

export const AddCategory = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryName, setCategoryName] = useState('');
  const queryClient = useQueryClient();
  const { mutate: addCategoryAction, isLoading } = useMutation({
    mutationFn: ({ title }: CreateCategoryPayload) =>
      createCategoryService({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('تم اضافة الصنف بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategoryAction({ title: categoryName });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="اضافة حجم" centered>
        <form onSubmit={handleAdd}>
          <TextInput
            label="اسم الصنف"
            placeholder="اسم الصنف"
            required
            variant="filled"
            className="mb-4"
            value={categoryName}
            onChange={(e) => setCategoryName(e.currentTarget.value)}
          />
          <div className="mt-4 flex items-center gap-4">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!categoryName || isLoading}
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
        اضافة صنف جديد
      </Button>
    </>
  );
};
