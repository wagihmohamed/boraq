import { OrdersFilter } from '@/services/getOrders';

export const reduceUnusedReportsFilters = (params?: OrdersFilter) => {
  const minifiedParams =
    params &&
    Object.keys(params).reduce((acc, key) => {
      if (
        params &&
        params[key as keyof OrdersFilter] !== '0' &&
        params[key as keyof OrdersFilter] !== '' &&
        params[key as keyof OrdersFilter] !== undefined &&
        params[key as keyof OrdersFilter] !== 0 &&
        key !== 'page' &&
        key !== 'size'
      ) {
        if (key === 'statuses') {
          return {
            ...acc,
            statuses: (params[key as keyof OrdersFilter] as string[])?.length
              ? (params[key as keyof OrdersFilter] as string[]).join(',')
              : undefined,
          };
        }
        if (key === 'confirmed') {
          return {
            ...acc,
            confirmed: !!(params[key as keyof OrdersFilter] as boolean),
          };
        }

        return {
          ...acc,
          [key]: params[key as keyof OrdersFilter],
        };
      }
      return acc;
    }, {});

  return params ? minifiedParams : undefined;
};
