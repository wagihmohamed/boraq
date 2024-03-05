import { OrdersFilter } from '@/services/getOrders';

export const reduceUnusedReportsFilters = (params?: OrdersFilter) => {
  return params
    ? Object.keys(params).reduce((acc, key) => {
        if (
          params &&
          params[key as keyof OrdersFilter] &&
          params[key as keyof OrdersFilter] !== '0' &&
          params[key as keyof OrdersFilter] !== '' &&
          params[key as keyof OrdersFilter] !== undefined &&
          params[key as keyof OrdersFilter] !== 0 &&
          key !== 'page' &&
          key !== 'size'
        ) {
          return {
            ...acc,
            [key]: params[key as keyof OrdersFilter],
          };
        }
        return acc;
      }, {})
    : undefined;
};
