import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addProductSchema } from './schema';
import { Button, Grid, Select, TextInput } from '@mantine/core';
import { useCategory } from '@/hooks/useCategory';
import { z } from 'zod';
import { useColors } from '@/hooks/useColors';
import { useSizes } from '@/hooks/useSizes';
import { IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateProductPayload,
  createProductService,
} from '@/services/createProduct';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const AddProduct = () => {
  const navigate = useNavigate();
  const {
    data: categories = {
      data: [],
    },
  } = useCategory();
  const { data: colors = { data: [] } } = useColors();
  const { data: sizes = { data: [] } } = useSizes();
  const colorsOptions = colors.data.map((color) => ({
    value: color.id,
    label: color.title,
  }));
  const sizesOptions = sizes.data.map((size) => ({
    value: size.id,
    label: size.title,
  }));
  const categoriesOptions = categories.data.map((category) => ({
    value: category.id,
    label: category.title,
  }));
  const form = useForm({
    validate: zodResolver(addProductSchema),
    initialValues: {
      title: '',
      price: '',
      image: 'https://picsum.photos/200/300',
      stock: '',
      category: '',
      colors: [] as unknown as { label: string; value: string; quantity: '' }[],
      sizes: [] as unknown as { label: string; value: string; quantity: '' }[],
    },
  });

  const productColors = form.values.colors.map((color, index) => {
    return (
      <div key={color.value} className="relative">
        <TextInput
          label={`اللون ${color.label}`}
          placeholder="الكمية"
          {...form.getInputProps(`colors.${index}.quantity`)}
        />
        <IconX
          size={20}
          className="absolute top-0 left-0 cursor-pointer  text-primary border-primary border-2 rounded-full"
          onClick={() => {
            form.removeListItem('colors', index);
          }}
        />
      </div>
    );
  });

  const productSizes = form.values.sizes.map((size, index) => {
    return (
      <div key={size.value} className="relative">
        <TextInput
          key={size.value}
          label={`الحجم ${size.label}`}
          placeholder="الكمية"
          {...form.getInputProps(`sizes.${index}.quantity`)}
        />
        <IconX
          size={20}
          className="absolute top-0 left-0 cursor-pointer  text-primary border-primary border-2 rounded-full"
          onClick={() => {
            form.removeListItem('sizes', index);
          }}
        />
      </div>
    );
  });
  const queryClient = useQueryClient();
  const { mutate: createProductAction, isLoading } = useMutation({
    mutationFn: ({
      category,
      colors,
      image,
      price,
      sizes,
      stock,
      title,
    }: CreateProductPayload) => {
      return createProductService({
        category,
        colors,
        image,
        price,
        sizes,
        stock,
        title,
      });
    },
    onSuccess: () => {
      toast.success('تم اضافة المنتج بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      navigate('/home');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = (values: z.infer<typeof addProductSchema>) => {
    const everyColorHasQuantity = values.colors.every(
      (color) => color.quantity !== ''
    );
    const everySizeHasQuantity = values.sizes.every(
      (size) => size.quantity !== ''
    );
    if (!everyColorHasQuantity) {
      form.setFieldError('colors', 'يجب اضافة الكمية المتاحة');
      return;
    }
    if (!everySizeHasQuantity) {
      form.setFieldError('sizes', 'يجب اضافة الكمية المتاحة');
      return;
    }
    const transformedColors = values.colors.map((color) => ({
      title: color.label,
      quantity: parseInt(color.quantity, 10),
    }));
    const transformedSizes = values.sizes.map((size) => ({
      title: size.label,
      quantity: parseInt(size.quantity, 10),
    }));
    createProductAction({
      category: values.category,
      colors: transformedColors,
      image: values.image,
      price: parseInt(values.price, 10),
      sizes: transformedSizes,
      stock: parseInt(values.stock, 10),
      title: values.title,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/home');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة منتج</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="اسم المنتج" {...form.getInputProps('title')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="سعر المنتج"
              type="number"
              {...form.getInputProps('price')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الكمية"
              type="number"
              {...form.getInputProps('stock')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="القسم"
              {...form.getInputProps('category')}
              data={categoriesOptions}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="الالوان"
              data={colorsOptions}
              onChange={(value) => {
                const selectedColor = colorsOptions.find(
                  (color) => color.value === value
                );
                const isColorAdded = form.values.colors.find(
                  (color) => color.value === value
                );
                if (isColorAdded) {
                  return;
                }
                if (selectedColor) {
                  form.insertListItem('colors', {
                    label: selectedColor.label,
                    value: selectedColor.value,
                    quantity: '',
                  });
                }
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {productColors}
            </div>
            {form.errors.colors && (
              <div className="text-red-500 text-sm">
                يجب اضافة الالوان المتاحة
              </div>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="المقاسات"
              data={sizesOptions}
              onChange={(value) => {
                const selectedSize = sizesOptions.find(
                  (size) => size.value === value
                );
                const isSizeAdded = form.values.sizes.find(
                  (size) => size.value === value
                );
                if (isSizeAdded) {
                  return;
                }
                if (selectedSize) {
                  form.insertListItem('sizes', {
                    label: selectedSize.label,
                    value: selectedSize.value,
                    quantity: '',
                  });
                }
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {productSizes}
            </div>
            {form.errors.sizes && (
              <div className="text-red-500 text-sm">
                يجب اضافة المقاسات المتاحة
              </div>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              loading={isLoading}
              disabled={isLoading}
            >
              اضافة
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              onClick={() => {
                navigate('/products');
              }}
              type="submit"
              variant="outline"
              fullWidth
              mt="xl"
              size="md"
            >
              العودة
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
