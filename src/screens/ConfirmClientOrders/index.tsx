import { useOrders } from '@/hooks/useOrders';
import { OrdersFilter } from '@/services/getOrders';
import { useDebouncedState } from '@mantine/hooks';
import { useState } from 'react';
import { ordersFilterInitialState } from '../Orders';
import { AppLayout } from '@/components/AppLayout';
import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { OrdersTable } from '../Orders/components/OrdersTable';
import { columns } from './columns';
import { useChangeOrderStatus } from '@/hooks/useChangeOrderStatus';
import toast from 'react-hot-toast';
import { ClientOrdersActions } from './components/ClientOrdersActions';

export const ConfirmClientOrders = () => {
  const [receiptNumber, setReceiptNumber] = useDebouncedState('', 300);
  const [filters, setFilters] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    confirmed: false,
  });
  const [search] = useDebouncedState('', 300);
  // const [search, setSearch] = useDebouncedState('', 300);

  const {
    data: orders = {
      data: {
        orders: [],
      },
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useOrders({
    ...filters,
    search,
  });

  const { mutate: changeOrderConfirmedStatus, isLoading } =
    useChangeOrderStatus();
  const { data: orderDetails } = useOrders(
    {
      confirmed: false,
      search: receiptNumber,
    },
    receiptNumber.length > 0
  );

  const handleChangeOrderStatus = () => {
    if (receiptNumber.length === 0) {
      toast.error('أدخل رقم الوصل');
      return;
    }

    if (!orderDetails?.data.orders.length) {
      toast.error('الطلب غير موجود');
      return;
    }

    if (orderDetails?.data.orders[0].confirmed) {
      toast.error('الطلب مؤكد مسبقاً');
      return;
    }

    changeOrderConfirmedStatus(
      {
        id: orderDetails.data.orders[0].id,
        data: {
          confirmed: true,
        },
      },
      {
        onSuccess: () => {
          setReceiptNumber('');
          toast.success('تم تعديل حالة الطلب بنجاح');
        },
        onError: () => {
          toast.error('حدث خطأ أثناء تأكيد الوصل');
        },
      }
    );
  };

  return (
    <AppLayout isError={isError}>
      <ClientOrdersActions />
      <div className="flex gap-4 items-center">
        <TextInput
          placeholder="أدخل رقم الوصل"
          defaultValue={receiptNumber}
          className="w-1/4"
          onChange={(event) => setReceiptNumber(event.currentTarget.value)}
          label="تأكيد مباشر برقم الوصل"
          type="number"
        />
        <Button
          className="mt-6"
          disabled={isLoading}
          onClick={handleChangeOrderStatus}
        >
          تأكيد
        </Button>
      </div>
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <OrdersTable
          columns={columns}
          data={orders.data.orders}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: orders.pagesCount,
          }}
        />
      </div>
    </AppLayout>
  );
};
