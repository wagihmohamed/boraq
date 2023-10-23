import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addProductSchema } from './schema';
import { Grid, Select, TextInput } from '@mantine/core';
import { useCategory } from '@/hooks/useCategory';
import { z } from 'zod';
import { useColors } from '@/hooks/useColors';
import { useSizes } from '@/hooks/useSizes';

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
      colors: [] as unknown as { label: string; value: string }[],
      sizes: [] as unknown as { label: string; value: string }[],
    },
  });

  const productColors = form.values.colors.map((color, index) => {
    return (
      <TextInput
        key={color.value}
        label={`اللون ${color.label}`}
        placeholder="الكمية"
        {...form.getInputProps(`colors.${index}.quantity`)}
      />
    );
  });

  const productSizes = form.values.sizes.map((size, index) => {
    return (
      <TextInput
        key={size.value}
        label={`الحجم ${size.label}`}
        placeholder="الكمية"
        {...form.getInputProps(`sizes.${index}.quantity`)}
      />
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: z.infer<typeof addProductSchema>) => {};

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
      <form>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="اسم المنتج" {...form.getInputProps('title')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="سعر المنتج" {...form.getInputProps('price')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput label="الكمية" {...form.getInputProps('stock')} />
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
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="المقاسات"
              data={sizesOptions}
              onChange={(value) => {
                const selectedSize = sizesOptions.find(
                  (size) => size.value === value
                );
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
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
