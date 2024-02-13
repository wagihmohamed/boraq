/* eslint-disable import/no-cycle */
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
  MultiSelect,
  NumberInput,
  Select,
  Switch,
  TextInput,
  Textarea,
} from '@mantine/core';
import { X } from 'lucide-react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { OrderBulkFormValues } from '..';
import { useProducts } from '@/hooks/useProducts';

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
  const {
    data: productsData = {
      data: [],
    },
  } = useProducts({ size: 1000, only_title_and_id: true });
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

  const productsOptions = productsData.data.map((product) => ({
    value: product.id.toString(),
    label: product.title,
  }));

  const getSelectedProductColors = (productID: string) => {
    const product = productsData.data.find(
      (product) => product.id.toString() === productID
    );
    if (product) {
      return product.productColors
        .filter((productColor) => productColor.quantity > 0)
        .map((productColor) => ({
          value: productColor.color.id.toString(),
          label: productColor.color.title,
        }));
    }
    return [];
  };

  const getSelectedProductSizes = (productID: string) => {
    const product = productsData.data.find(
      (product) => product.id.toString() === productID
    );
    if (product) {
      return product.productSizes
        .filter((productSize) => productSize.quantity > 0)
        .map((productSize) => ({
          value: productSize.size.id.toString(),
          label: productSize.size.title,
        }));
    }
    return [];
  };

  const hasProducts = form.values.orders[index].withProducts;

  const productsItems = form.values.orders[index]?.products?.map(
    (product, productsIndex) => {
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
            {...form.getInputProps(
              `orders.${index}.products.${productsIndex}.label`
            )}
            disabled
          />
          <TextInput
            label="الكمية"
            placeholder=""
            type="number"
            size="md"
            className="w-full"
            {...form.getInputProps(
              `orders.${index}.products.${productsIndex}.quantity`
            )}
          />
          <Select
            searchable
            label="اللون"
            placeholder="اختار اللون"
            data={getSelectedProductColors(product.productID)}
            limit={100}
            {...form.getInputProps(
              `orders.${index}.products.${productsIndex}.colorID`
            )}
          />
          <Select
            searchable
            label="المقاس"
            placeholder="اختار المقاس"
            data={getSelectedProductSizes(product.productID)}
            limit={100}
            {...form.getInputProps(
              `orders.${index}.products.${productsIndex}.sizeID`
            )}
          />
        </div>
      );
    }
  );
  const orderProducts = form.values.orders[index].products;

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
      <Switch
        className="mt-8 mb-3"
        label="مع منتجات"
        {...form.getInputProps(`orders.${index}.withProducts`)}
      />
      <Grid grow gutter="lg">
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
        {!hasProducts && (
          <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
            <NumberInput
              label="مبلغ الوصل "
              placeholder=""
              thousandSeparator=","
              size="md"
              allowNegative={false}
              className="w-full"
              {...form.getInputProps(`orders.${index}.totalCost`)}
            />
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <NumberInput
            label="رقم الوصل"
            placeholder=""
            thousandSeparator=","
            size="md"
            allowNegative={false}
            className="w-full"
            {...form.getInputProps(`orders.${index}.receiptNumber`)}
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
          <Select
            searchable
            label="المنطقة"
            limit={100}
            placeholder="اختار المنطقة"
            data={getSelectOptions(locationsData)}
            {...form.getInputProps(`orders.${index}.locationID`)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 2, sm: 12, xs: 12 }}>
          <Textarea
            label="تفاصيل اكثر عن العنوان"
            {...form.getInputProps(`orders.${index}.details`)}
            autosize
            minRows={2}
            maxRows={4}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3, sm: 12, xs: 12 }}>
          {numberFields}
        </Grid.Col>
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
          <TextInput
            label="اسم المستلم"
            placeholder=""
            size="md"
            className="w-full"
            {...form.getInputProps(`orders.${index}.recipientName`)}
          />
        </Grid.Col>
        {!hasProducts && (
          <>
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
          </>
        )}
        <Grid.Col span={{ base: 12, md: 12, lg: 12, xl: 12, sm: 12, xs: 12 }}>
          {hasProducts && (
            <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
              <MultiSelect
                searchable
                label="المنتجات"
                placeholder="اختار المنتجات"
                data={productsOptions}
                limit={100}
                onChange={(selectedProductsIds) => {
                  const productsLabels = selectedProductsIds.map(
                    (productID) => {
                      const isProductAdded = orderProducts?.find(
                        (product) => product.productID === productID
                      );
                      if (isProductAdded) {
                        return isProductAdded;
                      }

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

                  form.setFieldValue(
                    `orders.${index}.products`,
                    productsLabels
                  );
                }}
                error={form.errors.products}
              />
              <div className="mt-5">{productsItems}</div>
            </Grid.Col>
          )}
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
