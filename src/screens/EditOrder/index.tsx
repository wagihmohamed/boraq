/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { editOrderSchema } from './schema';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Grid,
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
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { useProducts } from '@/hooks/useProducts';
import { useColors } from '@/hooks/useColors';
import { useSizes } from '@/hooks/useSizes';
import { useOrderDetails } from '@/hooks/useOrderDetails';
import { useEffect } from 'react';
import { OrderDetails } from '@/services/getOrderDetails';
import { EditOrderPayload, editOrderService } from '@/services/editOrder';
import {
  orderStatusArabicNames,
  orderStatusArray,
} from '@/lib/orderStatusArabicNames';
import { useEmployees } from '@/hooks/useEmployees';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/ar';
import { parseISO, format } from 'date-fns';

export const EditOrder = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: employeesData } = useEmployees({ size: 200 });
  const { data: colors = { data: [] } } = useColors({ size: 200 });
  const { data: sizes = { data: [] } } = useSizes({ size: 200 });
  const {
    data: orderDetails = {
      data: {} as OrderDetails,
    },
    isLoading: isFetchingProduct,
    isError,
  } = useOrderDetails(id);

  const form = useForm({
    validate: zodResolver(editOrderSchema),
    initialValues: {
      paidAmount: '',
      discount: '',
      withProducts: false,
      deliveryAgentID: '',
      totalCost: '',
      quantity: '',
      status: '',
      weight: '',
      recipientName: '',
      recipientPhone: '',
      recipientAddress: '',
      deliveryDate: '',
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

  useEffect(() => {
    if (orderDetails?.data) {
      form.setValues({
        paidAmount: orderDetails?.data?.paidAmount?.toString(),
        discount: orderDetails?.data?.discount?.toString(),
        status: orderDetails?.data?.status,
        deliveryAgentID:
          orderDetails?.data?.deliveryAgent?.id &&
          (orderDetails?.data?.deliveryAgent.id || ''),
        withProducts: orderDetails.data.OrderProducts?.length > 0,
        deliveryDate: orderDetails?.data?.deliveryDate || '',
        totalCost: orderDetails?.data?.totalCost?.toString(),
        quantity: orderDetails?.data?.quantity?.toString(),
        weight: orderDetails?.data?.weight?.toString(),
        recipientName: orderDetails?.data?.recipientName,
        recipientPhone: orderDetails?.data?.recipientPhone,
        recipientAddress: orderDetails?.data?.recipientAddress,
        notes: orderDetails?.data?.notes || '',
        details: orderDetails?.data?.details || '',
        deliveryType: orderDetails?.data?.deliveryType,
        governorate: orderDetails?.data?.governorate,
        locationID: orderDetails?.data?.location?.id,
        storeID: orderDetails?.data?.store?.id,
        products: orderDetails?.data?.OrderProducts?.map((product) => ({
          label: product.product?.title,
          productID: product.product?.id,
          quantity: product.quantity?.toString(),
          colorID: product?.color?.id,
          sizeID: product?.size?.id,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails]);

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

  const { mutate: editOrder, isLoading } = useMutation({
    mutationFn: (data: EditOrderPayload) => {
      return editOrderService({
        id,
        data,
      });
    },
    onSuccess: () => {
      toast.success('تم تعديل الطلب بنجاح');
      navigate('/orders');
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditOrder = (values: z.infer<typeof editOrderSchema>) => {
    editOrder({
      deliveryAgentID: values.deliveryAgentID,
      deliveryDate: values.deliveryDate,
      details: values.details || '',
      discount: parseInt(values.discount),
      notes: values.notes || '',
      paidAmount: parseInt(values.paidAmount),
      recipientAddress: values.recipientAddress,
      recipientName: values.recipientName,
      recipientPhone: values.recipientPhone,
      status: values.status as keyof typeof orderStatusArabicNames,
    });
  };

  const hasProducts = form.values.withProducts;
  const productsOptions = productsData.data.map((product) => ({
    value: product.id,
    label: product.title,
  }));

  const colorsOptions = colors.data.map((color) => ({
    value: color.id,
    label: color.title,
  }));
  const sizesOptions = sizes.data.map((size) => ({
    value: size.id,
    label: size.title,
  }));

  const productsItems = form.values.products?.map((product, index) => {
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
          disabled
        />
        <Select
          searchable
          label="اللون"
          placeholder="اختار اللون"
          data={colorsOptions}
          {...form.getInputProps(`products.${index}.colorID`)}
          disabled
        />
        <Select
          searchable
          label="المقاس"
          placeholder="اختار المقاس"
          data={sizesOptions}
          {...form.getInputProps(`products.${index}.sizeID`)}
          disabled
        />
      </div>
    );
  });

  const convertDateFormat = (date: Date | null): string | null => {
    if (date) {
      const parsedDate = parseISO(date.toISOString());
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    return null;
  };

  return (
    <AppLayout isLoading={isFetchingProduct} isError={isError}>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/orders');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل طلب</h1>
      </div>
      <form onSubmit={form.onSubmit(handleEditOrder)}>
        <Switch
          className="mt-8 mb-3"
          label="مع منتجات"
          disabled
          checked={form.values.withProducts}
          onChange={(event) => {
            form.setFieldValue('withProducts', event.currentTarget.checked);
          }}
        />
        <Grid gutter="lg">
          {!hasProducts && (
            <>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <TextInput
                  label="اجمالي التكلفة"
                  placeholder=""
                  type="number"
                  disabled
                  size="md"
                  className="w-full"
                  {...form.getInputProps('totalCost')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                <TextInput
                  label="الكمية"
                  type="number"
                  disabled
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
                  disabled
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
              label="المبلغ المدفوع"
              placeholder=""
              type="number"
              size="md"
              className="w-full"
              {...form.getInputProps('paidAmount')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="حالة الطلب"
              size="md"
              className="w-full"
              data={orderStatusArray}
              {...form.getInputProps('status')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              label="مندوب التوصيل"
              size="md"
              className="w-full"
              data={getSelectOptions(employeesData?.data || [])}
              {...form.getInputProps('deliveryAgentID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <div className="flex flex-col items-center">
              <p>تاريخ التوصيل</p>
              <DatePicker
                className="border-4 rounded-lg border-primary/60 "
                locale="ar"
                value={
                  form.values.deliveryDate
                    ? new Date(form.values.deliveryDate || '')
                    : undefined
                }
                onChange={(date) => {
                  const newDeliveryDate = convertDateFormat(date);
                  form.setFieldValue('deliveryDate', newDeliveryDate || '');
                }}
              />
              {form.errors.deliveryDate && (
                <p className="text-red-500">{form.errors.deliveryDate}</p>
              )}
              {form.values.deliveryDate && (
                <Button
                  onClick={() => {
                    form.setFieldValue('deliveryDate', '');
                  }}
                  fullWidth
                  className="mt-3"
                  variant="outline"
                >
                  الحذف
                </Button>
              )}
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <TextInput
              label="الخصم"
              placeholder=""
              type="number"
              size="md"
              className="w-full"
              {...form.getInputProps('discount')}
            />
          </Grid.Col>
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
            <TextInput
              label="رقم المستلم"
              placeholder=""
              size="md"
              className="w-full"
              {...form.getInputProps('recipientPhone')}
            />
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
              disabled
              data={getSelectOptions(storesData.data)}
              {...form.getInputProps('storeID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المناطق"
              placeholder="اختار المنطقة"
              disabled
              data={getSelectOptions(locationsData.data)}
              {...form.getInputProps('locationID')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="نوع التوصيل"
              placeholder="اختار نوع التوصيل"
              disabled
              data={deliveryTypesArray}
              {...form.getInputProps('deliveryType')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المحافظة"
              placeholder="اختار المحافظة"
              disabled
              data={governorateArray}
              {...form.getInputProps('governorate')}
            />
          </Grid.Col>
          {hasProducts && (
            <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
              <MultiSelect
                // {...form.getInputProps('products')}
                searchable
                disabled
                label="المنتجات"
                placeholder="اختار المنتجات"
                value={form.values.products.map((product) => product.productID)}
                data={productsOptions}
                onChange={(selectedProductsIds) => {
                  const productsLabels = selectedProductsIds.map(
                    (productID) => {
                      const product = productsData.data.find(
                        (product) => product.id === productID
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
              تعديل
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
