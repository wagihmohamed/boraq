import { useChangeOrderStatus } from '@/hooks/useChangeOrderStatus';
import { useOrderDetailsByReceiptNumberAction } from '@/hooks/useOrderDetailsAction';
import { useRepositories } from '@/hooks/useRepositories';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { Button, Select, TextInput } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const SendOrderToRepository = () => {
  const queryClient = useQueryClient();
  const [receiptNumber, setReceiptNumber] = useState('');

  const {
    mutate: getOrderDetails,
    reset: resetOrderDetails,
    isLoading: isGettingOrderDetailsLoading,
  } = useOrderDetailsByReceiptNumberAction();

  const { data: repositoriesData } = useRepositories({
    size: 100000,
    minified: true,
  });
  const [selectedRepository, setSelectedRepository] = useState<string | null>(
    null
  );

  const { mutate: changeStatus, isLoading } = useChangeOrderStatus();

  const handleChangeOrderStatus = () => {
    if (receiptNumber.length === 0) {
      toast.error('أدخل رقم الوصل');
      return;
    }

    getOrderDetails(receiptNumber, {
      onSuccess: ({ data }) => {
        if (!data?.orders?.[0].id) {
          toast.error('الطلب غير موجود');
          return;
        }
        changeStatus(
          {
            id: Number(data?.orders?.[0].id),
            data: {
              repositoryID: Number(selectedRepository),
              status: 'RETURNED',
              secondaryStatus: 'IN_REPOSITORY',
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['orders'],
              });
              toast.success('تم تعديل حالة الطلب بنجاح');
              setReceiptNumber('');
              setSelectedRepository(null);
              resetOrderDetails();
            },
          }
        );
      },
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <TextInput
        placeholder="أدخل رقم الوصل"
        value={receiptNumber}
        onChange={(event) => setReceiptNumber(event.currentTarget.value)}
        label="تأكيد مباشر برقم الوصل"
        type="number"
      />
      <Select
        value={selectedRepository}
        allowDeselect
        label="المخزن"
        searchable
        clearable
        onChange={(e) => {
          setSelectedRepository(e);
        }}
        placeholder="اختر المخزن"
        data={getSelectOptions(repositoriesData?.data || [])}
        limit={100}
      />
      <Button
        className="mt-6"
        disabled={isLoading || isGettingOrderDetailsLoading}
        onClick={handleChangeOrderStatus}
      >
        تأكيد
      </Button>
    </div>
  );
};
