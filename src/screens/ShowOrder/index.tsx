import { AppLayout } from '@/components/AppLayout';
import { useOrderDetails } from '@/hooks/useOrderDetails';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { OrderDetails } from '@/services/getOrderDetails';
import { Button, Grid, TextInput, Textarea } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ShowOrder = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const {
    data: orederDetails = { data: {} as OrderDetails },
    isLoading,
    isError,
  } = useOrderDetails(id);

  const hasProducts = orederDetails?.data?.OrderProducts?.length > 0;

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex items-center gap-4 mb-4">
        <ChevronRight
          size={34}
          className="mt-2 cursor-pointer"
          onClick={() => {
            navigate('/orders');
          }}
        />
        <h1 className="text-3xl font-semibold">بيانات الطلب</h1>
      </div>
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
                value={orederDetails?.data?.totalCost}
                disabled
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
              <TextInput
                label="الكمية"
                type="number"
                placeholder=""
                size="md"
                className="w-full"
                value={orederDetails?.data?.quantity}
                disabled
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
              <TextInput
                label="الوزن"
                type="number"
                placeholder=""
                size="md"
                className="w-full"
                value={orederDetails?.data?.weight}
                disabled
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
            value={orederDetails.data?.recipientName}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="رقم المستلم"
            placeholder=""
            size="md"
            className="w-full"
            value={orederDetails.data?.recipientPhone}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="العنوان"
            placeholder=""
            size="md"
            className="w-full"
            value={orederDetails.data?.recipientAddress}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="المتجر"
            placeholder="اختار المتجر"
            size="md"
            className="w-full"
            value={orederDetails.data?.store?.name}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="المناطق"
            placeholder="اختار المنطقة"
            value={orederDetails.data?.location?.name}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="نوع التوصيل"
            placeholder="اختار نوع التوصيل"
            value={deliveryTypesArabicNames[orederDetails.data?.deliveryType]}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="المحافظة"
            placeholder="اختار المحافظة"
            value={governorateArabicNames[orederDetails.data?.governorate]}
            disabled
          />
        </Grid.Col>
        {hasProducts && (
          <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
            <p className="text-2xl font-semibold mb-5">المنتجات</p>
            {orederDetails?.data?.OrderProducts?.map((product) => (
              <div
                key={product.product.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 border-primary/60 rounded-md px-4 py-2 border-4 mb-4"
              >
                <TextInput
                  label="الاسم"
                  placeholder=""
                  size="md"
                  className="w-full"
                  value={product.product?.title}
                  disabled
                />
                <TextInput
                  label="الكمية"
                  placeholder=""
                  type="number"
                  size="md"
                  className="w-full"
                  value={product.quantity}
                  disabled
                />
                <TextInput
                  label="اللون"
                  placeholder="اختار اللون"
                  size="md"
                  className="w-full"
                  value={product.color?.title || 'لم يتم الاختيار'}
                  disabled
                />
                <TextInput
                  label="المقاس"
                  placeholder="اختار المقاس"
                  size="md"
                  className="w-full"
                  value={product.size?.title || 'لم يتم الاختيار'}
                  disabled
                />
              </div>
            ))}
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Textarea
            label="الملاحظات"
            value={orederDetails.data?.notes}
            disabled
            rows={7}
            maxRows={10}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Textarea
            label="التفاصيل"
            value={orederDetails.data?.details}
            disabled
            rows={7}
            maxRows={10}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Button type="submit" fullWidth mt="xl" size="md">
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
            العودة
          </Button>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};
