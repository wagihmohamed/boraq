import { AppLayout } from '@/components/AppLayout';
import { useCategory } from '@/hooks/useCategory';
import { useColors } from '@/hooks/useColors';
import { useProductDetails } from '@/hooks/useProductDetails';
import { useSizes } from '@/hooks/useSizes';
import {
  Badge,
  Button,
  Grid,
  Image,
  Select,
  TextInput,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconX } from '@tabler/icons-react';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editProductSchema } from './schema';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProductPayload, editProductService } from '@/services/editProduct';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

export const EditProductScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const { data: productDetails, isLoading, isError } = useProductDetails(id);

  const form = useForm({
    validate: zodResolver(editProductSchema),
    initialValues: {
      title: '',
      price: '',
      stock: '',
      category: '',
      colors: [] as unknown as {
        label: string;
        value?: string;
        quantity: string;
      }[],
      sizes: [] as unknown as {
        label: string;
        value?: string;
        quantity: string;
      }[],
      image: '',
    },
  });

  const { data: categories } = useCategory();
  const categoryOptions = categories?.data.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  useEffect(() => {
    if (productDetails) {
      const selectedCategory = categoryOptions?.find(
        (category) => category.label === productDetails.data.Category?.title
      );
      form.setValues({
        title: productDetails.data.title,
        price: productDetails.data.price,
        stock: productDetails.data.stock.toString(),
        category: selectedCategory?.value || '',
        colors: productDetails.data.ProductColors.map((color) => ({
          label: color.color.title,
          quantity: color.quantity.toString(),
        })),
        sizes: productDetails.data.ProductSizes.map((size) => ({
          label: size.size.title,
          quantity: size.quantity.toString(),
        })),
        image: productDetails.data.image,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails]);

  const { data: colors = { data: [] } } = useColors();
  const colorsOptions = colors.data.map((color) => ({
    value: color.id,
    label: color.title,
  }));
  const { data: sizes = { data: [] } } = useSizes();
  const sizesOptions = sizes.data.map((size) => ({
    value: size.id,
    label: size.title,
  }));

  const productColors = form.values.colors.map((color, index) => {
    return (
      <div key={color.label} className="relative">
        <TextInput
          type="number"
          label={
            <div className="mb-2">
              <Badge color={color.label}>{color.label}</Badge>
            </div>
          }
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
      <div key={size.label} className="relative">
        <TextInput
          type="number"
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

  const { mutate: editProductAction, isLoading: isEdditing } = useMutation({
    mutationFn: ({
      category,
      colors,
      image,
      price,
      sizes,
      stock,
      title,
    }: EditProductPayload) => {
      return editProductService({
        data: {
          category,
          colors,
          image,
          price,
          sizes,
          stock,
          title,
        },
        id,
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل المنتج بنجاح');
      navigate('/home');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
  const handleSubmit = (values: z.infer<typeof editProductSchema>) => {
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
    const selectedCategory = categoryOptions?.find(
      (category) => category.value === values.category
    );
    console.log(values);
    console.log({ transformedColors });
    console.log({ transformedSizes });

    editProductAction({
      category: selectedCategory?.label || '',
      colors: transformedColors,
      image: values.image,
      price: parseInt(values.price, 10),
      sizes: transformedSizes,
      stock: parseInt(values.stock, 10),
      title: values.title,
    });
  };

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4 mb-6">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/home');
          }}
        />
        <h1 className="text-3xl font-semibold">
          تعديل المنتج {productDetails?.data.title}
        </h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
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
              key={form.values.category}
              label="الصنف"
              data={categoryOptions}
              {...form.getInputProps('category')}
            />
          </Grid.Col>
          <Grid.Col
            className="space-y-2"
            span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}
          >
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
            <Image
              fit="contain"
              mah={rem(400)}
              radius="md"
              src={form?.values.image}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }} />
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              disabled={isEdditing}
              loading={isEdditing}
            >
              تعديل
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              onClick={() => {
                navigate('/home');
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
