import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { EditOrderPayload, editOrderService } from '@/services/editOrder';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  orderStatusArabicNames,
  orderStatusArray,
} from '@/lib/orderStatusArabicNames';
import { useState } from 'react';

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
  open: () => void;
  status: keyof typeof orderStatusArabicNames;
}

export const ChangeOrderStatus = ({
  id,
  close,
  open,
  opened,
  status,
}: Props) => {
  const [orderStatus, setOrderStatus] = useState<
    keyof typeof orderStatusArabicNames | undefined
  >(status);
  const queryClient = useQueryClient();
  const { mutate: changeStatus, isLoading } = useMutation({
    mutationFn: (data: EditOrderPayload) => {
      return editOrderService({
        id,
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      toast.success('تم تعديلل حاالة الطلب بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleChangeStatus = () => {
    if (!orderStatus) {
      return;
    }
    changeStatus({
      status: orderStatus,
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الطلب" centered>
        <Card>
          <CardHeader>
            <CardTitle>تعديل حالة الطلب</CardTitle>
            <CardDescription>يمكنك تعديل حالة الطلب من هنا</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {orderStatusArray.map((status) => (
              <div
                key={status.value}
                className="flex items-center justify-between space-x-2"
              >
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>{status.label}</span>
                </Label>
                <Switch
                  id="necessary"
                  checked={status.value === orderStatus}
                  onCheckedChange={(value) => {
                    setOrderStatus(
                      value
                        ? (status.value as keyof typeof orderStatusArabicNames)
                        : undefined
                    );
                  }}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              loading={isLoading}
              disabled={isLoading}
              variant="outline"
              className="w-full"
              onClick={handleChangeStatus}
            >
              تعديل الحالة
            </Button>
          </CardFooter>
        </Card>
      </Modal>

      <Button className="mb-2" fullWidth variant="outline" onClick={open}>
        تعديل الحالة
      </Button>
    </>
  );
};
