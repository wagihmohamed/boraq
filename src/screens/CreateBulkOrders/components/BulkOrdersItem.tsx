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
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { X } from 'lucide-react';

interface BulkOrdersItemProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  handleDeleteOrder: (index: number) => void;
  storesData: Store[];
  locationsData: Location[];
}

export const BulkOrdersItem = ({
  form,
  handleDeleteOrder,
  index,
  locationsData,
  storesData,
}: BulkOrdersItemProps) => {
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
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="اجمالي التكلفة"
            placeholder=""
            type="number"
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.totalCost`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="الكمية"
            type="number"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.quantity`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="الوزن"
            type="number"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.weight`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="اسم المستلم"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientName`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="رقم المستلم"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientPhone`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <TextInput
            label="العنوان"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientAddress`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="المتجر"
            placeholder="اختار المتجر"
            limit={100}
            data={getSelectOptions(storesData)}
            {...form.getInputProps(`orders.${index}.storeID`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="المناطق"
            limit={100}
            placeholder="اختار المنطقة"
            data={getSelectOptions(locationsData)}
            {...form.getInputProps(`orders.${index}.locationID`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="نوع التوصيل"
            limit={100}
            placeholder="اختار نوع التوصيل"
            data={deliveryTypesArray}
            {...form.getInputProps(`orders.${index}.deliveryType`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Select
            searchable
            label="المحافظة"
            placeholder="اختار المحافظة"
            limit={100}
            data={governorateArray}
            {...form.getInputProps(`orders.${index}.governorate`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Textarea
            label="الملاحظات"
            {...form.getInputProps(`orders.${index}.notes`)}
            rows={7}
            maxRows={10}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
          <Textarea
            label="التفاصيل"
            {...form.getInputProps(`orders.${index}.details`)}
            rows={7}
            maxRows={10}
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
