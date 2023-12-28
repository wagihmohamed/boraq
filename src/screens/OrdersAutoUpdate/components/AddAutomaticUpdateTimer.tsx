import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, NumberInput, Radio } from '@mantine/core';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { orderStatusArray } from '@/lib/orderStatusArabicNames';
import { useForm, zodResolver } from '@mantine/form';
import { orderStatusAutomaticUpdateCreateSchema } from './AddAutomaticUpdateTimer.zod';
import { z } from 'zod';
import { orderReturnConditionArray } from '@/lib/orderReturnConditionArabicNames';

export const AddAutomaticUpdateTimer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    validate: zodResolver(orderStatusAutomaticUpdateCreateSchema),
    initialValues: {
      governorate: '',
      orderStatus: '',
      returnCondition: '',
      updateAt: 0,
      checkAfter: 0,
    },
  });

  const handleSubmit = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    values: z.infer<typeof orderStatusAutomaticUpdateCreateSchema>
  ) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="اضافة موعد تحديث الطلبات"
        centered
      >
        <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            data={governorateArray}
            label="اختر المحافظة"
            placeholder="اختر المحافظة"
            clearable
            searchable
            {...form.getInputProps('governorate')}
          />
          <Select
            data={orderStatusArray}
            label="اختر حالة الطلب"
            placeholder="اختر حالة الطلب"
            clearable
            searchable
            {...form.getInputProps('orderStatus')}
          />
          <NumberInput
            label="القيمة (بالساعة)"
            placeholder="القيمة (بالساعة)"
            allowNegative={false}
            allowDecimal={false}
            {...form.getInputProps('checkAfter')}
          />
          <NumberInput
            label="يوميا علي الساعة"
            placeholder="يوميا علي الساعة (24 ساعة)"
            allowNegative={false}
            allowDecimal={false}
            clampBehavior="strict"
            max={24}
            {...form.getInputProps('updateAt')}
          />
          <Radio.Group
            name="orderReturnCondition"
            label="اختر حالة الارجاع"
            withAsterisk
            {...form.getInputProps('returnCondition')}
          >
            <div className="flex items-center gap-4">
              {orderReturnConditionArray.map((item) => (
                <Radio key={item.value} value={item.value} label={item.label} />
              ))}
            </div>
          </Radio.Group>
          <div className="flex items-center gap-4">
            <Button type="submit">اضافة</Button>
            <Button type="reset" onClick={close} variant="outline">
              الغاء
            </Button>
          </div>
        </form>
      </Modal>

      <Button onClick={open}>اضافة موعد تحديث الطلبات</Button>
    </>
  );
};
