import { OrdersFilter } from '@/services/getOrders';

export const reduceUnusedReportsFilters = (params?: OrdersFilter) => {
  return params
    ? Object.keys(params).reduce((acc, key) => {
        if (
          params &&
          params[key as keyof OrdersFilter] &&
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
