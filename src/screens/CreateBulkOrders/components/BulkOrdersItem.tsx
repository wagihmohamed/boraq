/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deliveryTypesArray } from '@/lib/deliveryTypesArabicNames';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { Location } from '@/services/getLocations';
import { Store } from '@/services/getStores';
import {
  ActionIcon,
  Chip,
  Fieldset,
  Grid,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { X } from 'lucide-react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { OrderBulkFormValues } from '..';

interface BulkOrdersItemProps {
  index: number;
  form: UseFormReturnType<OrderBulkFormValues>;
  handleDeleteOrder: (index: number) => void;
  storesData: Store[];
  locationsData: Location[];
  createBulkOrdersBy: string | null;
}

export const BulkOrdersItem = ({
  form,
  handleDeleteOrder,
  index,
  locationsData,
  storesData,
  createBulkOrdersBy,
}: BulkOrdersItemProps) => {
  const numberFields = form.values.orders[index].recipientPhones.map(
    (
      phone: {
        phone: string;
        key: string;
      },
      phoneArrayIndex: number
    ) => {
      return (
        <Group key={phone.key}>
          <TextInput
            key={phone.key}
            label={`رقم المستلم ${phoneArrayIndex + 1}`}
            placeholder=""
            size="md"
            withAsterisk
            style={{ flex: 1 }}
            {...form.getInputProps(
              `orders.${index}.recipientPhones.${phoneArrayIndex}.phone`
            )}
          />
          <ActionIcon
            color="red"
            onClick={() => {
              if (form.values.orders[index].recipientPhones.length > 1) {
                form.removeListItem(
                  `orders.${index}.recipientPhones`,
                  phoneArrayIndex
                );
              }
            }}
            className="mt-6"
          >
            <IconTrash size="1rem" />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              form.insertListItem(`orders.${index}.recipientPhones`, {
                phone: '',
                key: randomId(),
              });
            }}
            className="mt-6"
          >
            <IconPlus size="1rem" />
          </ActionIcon>
        </Group>
      );
    }
  );

  return (
    <Fieldset
      legend={
        <Chip variant="outline" color="blue" checked>
          {`الطلب رقم ${index + 1}`}
        </Chip>
      }
      className="relative mt-5"
    >
      <ActionIcon
        style={{
          position: 'absolute',
          left: '1rem',
          top: '-1.5rem',
        }}
        variant="filled"
        color="red"
        onClick={() => handleDeleteOrder(index)}
      >
        <X />
      </ActionIcon>
      <Grid grow gutter="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <NumberInput
            label="مبلغ الطلب"
            placeholder=""
            thousandSeparator=","
            size="md"
            allowNegative={false}
            className="w-full"
            {...form.getInputProps(`orders.${index}.totalCost`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <TextInput
            label="الكمية"
            type="number"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.quantity`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <TextInput
            label="الوزن"
            type="number"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.weight`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <TextInput
            label="اسم المستلم"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientName`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3, sm: 12, xs: 12 }}>
          {numberFields}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <TextInput
            label="العنوان"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientAddress`)}
          />
        </Grid.Col>

        {createBulkOrdersBy !== 'page' && (
          <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المتجر"
              placeholder="اختار المتجر"
              limit={100}
              data={getSelectOptions(storesData)}
              {...form.getInputProps(`orders.${index}.storeID`)}
            />
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="المناطق"
            limit={100}
            placeholder="اختار المنطقة"
            data={getSelectOptions(locationsData)}
            {...form.getInputProps(`orders.${index}.locationID`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="نوع التوصيل"
            limit={100}
            placeholder="اختار نوع التوصيل"
            data={deliveryTypesArray}
            {...form.getInputProps(`orders.${index}.deliveryType`)}
          />
        </Grid.Col>
        {createBulkOrdersBy !== 'governorate' && (
          <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
            <Select
              searchable
              label="المحافظة"
              placeholder="اختار المحافظة"
              limit={100}
              data={governorateArray}
              {...form.getInputProps(`orders.${index}.governorate`)}
            />
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <Textarea
            label="الملاحظات"
            {...form.getInputProps(`orders.${index}.notes`)}
            autosize
            minRows={2}
            maxRows={4}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <Textarea
            label="التفاصيل"
            {...form.getInputProps(`orders.${index}.details`)}
            autosize
            minRows={2}
            maxRows={4}
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
