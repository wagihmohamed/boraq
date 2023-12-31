import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { addOrderSchema } from './schema';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  MultiSelect,
  Select,
  Switch,
  TextInput,
  Textarea,
} from '@mantine/core';
import { deliveryTypesArray } from '@/lib/deliveryTypesArabicNames';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { useLocations } from '@/hooks/useLocations';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderPayload, createOrderService } from '@/services/createOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { useProducts } from '@/hooks/useProducts';
import { useColors } from '@/hooks/useColors';
import { useSizes } from '@/hooks/useSizes';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';

export const AddOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: colors = { data: [] } } = useColors({ size: 200 });
  const { data: sizes = { data: [] } } = useSizes({ size: 200 });

  const form = useForm({
    validate: zodResolver(addOrderSchema),
    initialValues: {
      withProducts: false,
      totalCost: '',
      quantity: '',
      weight: '',
      recipientName: '',
      recipientPhone: [
        {
          number: '',
          key: randomId(),
        },
      ],
      recipientAddress: '',
      notes: '',
      details: '',
      deliveryType: '',
      governorate: '',
      locationID: '',
      storeID: '',
      products: [] as unknown as {
        productID: string;
        quantity: string;
        colorID: string;
        sizeID: string;
      }[],
    },
  });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({ size: 500 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 500 });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: (data: CreateOrderPayload) => {
      return createOrderService(data);
    },
    onSuccess: () => {
      toast.success('تم اضافة الطلب بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ordersStatistics'],
      });
      form.reset();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const {
    data: productsData = {
      data: [],
    },
  } = useProducts({ size: 500 });

  const handleCreateOrder = (values: z.infer<typeof addOrderSchema>) => {
    if (!values.withProducts) {
      createOrder({
        deliveryType: values.deliveryType,
        details: values.details,
        governorate: values.governorate,
        locationID: Number(values.locationID),
        notes: values.notes,
        quantity: parseInt(values.quantity || ''),
        recipientAddress: values.recipientAddress,
        recipientName: values.recipientName,
        recipientPhones: values.recipientPhone.map((phone) => phone.number),
        storeID: Number(values.storeID),
        totalCost: parseInt(values.totalCost || ''),
        weight: parseInt(values.weight || ''),
        withProducts: values.withProducts,
      });
    } else {
      createOrder({
        deliveryType: values.deliveryType,
        details: values.details,
        governorate: values.governorate,
        locationID: Number(values.locationID),
        notes: values.notes,
        products:
          values.products &&
          values.products.map((product) => ({
            colorID: Number(product.colorID),
            productID: Number(product.productID),
            quantity: parseInt(product.quantity),
            sizeID: Number(product.sizeID),
          })),
        recipientAddress: values.recipientAddress,
        recipientName: values.recipientName,
        recipientPhones: values.recipientPhone.map((phone) => phone.number),
        storeID: Number(values.storeID),
        withProducts: values.withProducts,
      });
    }
  };

  const hasProducts = form.values.withProducts;
  const productsOptions = productsData.data.map((product) => ({
    value: product.id.toString(),
    label: product.title,
  }));

  const colorsOptions = colors.data.map((color) => ({
    value: color.id.toString(),
    label: color.title,
  }));
  const sizesOptions = sizes.data.map((size) => ({
    value: size.id.toString(),
    label: size.title,
  }));

  const numberFields = form.values.recipientPhone.map((phone, index) => (
    <Group key={phone.key}>
      <TextInput
        label={`رقم المستلم ${index + 1}`}
        placeholder=""
        size="md"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`recipientPhone.${index}.number`)}
      />
      <ActionIcon
        color="red"
        onClick={() => {
          if (index !== 0) {
            form.removeListItem('recipientPhone', index);
          }
        }}
        className="mt-6"
      >
        <IconTrash size="1rem" />
      </ActionIcon>
      <ActionIcon
        color="red"
        onClick={() => {
          form.insertListItem('recipientPhone', {
            number: '',
            key: randomId(),
          });
        }}
        className="mt-6"
      >
        <IconPlus size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const productsItems = form.values.products.map((product, index) => {
    return (
      <div
        key={product.productID}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border-primary/60 rounded px-4 py-2 border-4 mb-4"
      >
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps(`products.${index}.label`)}
          disabled
        />
        <TextInput
          label="الكمية"
          placeholder=""
          type="number"
          size="md"
          className="w-full"
          {...form.getInputProps(`products.${index}.quantity`)}
        />
        <Select
          searchable
          label="اللون"
          placeholder="اختار اللون"
          data={colorsOptions}
          limit={100}
          {...form.getInputProps(`products.${index}.colorID`)}
        />
        <Select
          searchable
          label="المقاس"
          placeholder="اختار المقاس"
          data={sizesOptions}
          limit={100}
          {...form.getInputProps(`products.${index}.sizeID`)}
        />
      </div>
    );
  });

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/orders');
          }}
        />
        <h1 className="text-3xl font-semibold">اضافة طلب</h1>
      </div>
      <form onSubmit={form.onSubmit(handleCreateOrder)}>
        <Switch
          className="mt-8 mb-3"
          label="مع منتجات"
          {...form.getInputProps('withProducts')}
        />
        <Grid gutter="lg">
          {!hasProducts && (
            <>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <TextInput
                  label="اجمالي التكلفة"
                  placeholder=""
                  type="number"
                  size="md"
                  className="w-full"
                  {...form.getInputProps('totalCost')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <TextInput
                  label="الكمية"
                  type="number"
                  placeholder=""
                  size="md"
                  className="w-full"
                  {...form.getInputProps('quantity')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <TextInput
                  label="الوزن"
                  type="number"
                  placeholder=""
                  size="md"
                  className="w-full"
                  {...form.getInputProps('weight')}
                />
              </Grid.Col>
            </>
          )}
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="اسم المستلم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            {/* <TextInput
              label="رقم المستلم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientPhone')}
            /> */}
            {numberFields}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="العنوان"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientAddress')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المتجر"
              placeholder="اختار المتجر"
              limit={100}
              data={getSelectOptions(storesData.data)}
              {...form.getInputProps('storeID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المناطق"
              limit={100}
              placeholder="اختار المنطقة"
              data={getSelectOptions(locationsData.data)}
              {...form.getInputProps('locationID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="نوع التوصيل"
              limit={100}
              placeholder="اختار نوع التوصيل"
              data={deliveryTypesArray}
              {...form.getInputProps('deliveryType')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المحافظة"
              placeholder="اختار المحافظة"
              limit={100}
              data={governorateArray}
              {...form.getInputProps('governorate')}
            />
          </Grid.Col>
          {hasProducts && (
            <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
              <MultiSelect
                // {...form.getInputProps('products')}
                searchable
                label="المنتجات"
                placeholder="اختار المنتجات"
                data={productsOptions}
                limit={100}
                onChange={(selectedProductsIds) => {
                  const productsLabels = selectedProductsIds.map(
                    (productID) => {
                      const product = productsData.data.find(
                        (product) => product.id.toString() === productID
                      );
                      return {
                        label: product?.title,
                        productID,
                        quantity: '1',
                        colorID: '',
                        sizeID: '',
                      };
                    }
                  );
                  form.setFieldValue('products', productsLabels);
                }}
                error={form.errors.products}
              />
              <div className="mt-5">{productsItems}</div>
            </Grid.Col>
          )}
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Textarea
              label="الملاحظات"
              {...form.getInputProps('notes')}
              rows={7}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Textarea
              label="التفاصيل"
              {...form.getInputProps('details')}
              rows={7}
              maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              fullWidth
              mt="xl"
              size="md"
            >
              اضافة
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Button
              type="reset"
              fullWidth
              mt="xl"
              size="md"
              variant="outline"
              onClick={() => {
                form.reset();
                navigate('/orders');
              }}
            >
              الغاء
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </AppLayout>
  );
};
