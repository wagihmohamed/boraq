export const reduceUnusedReportsFilters = <T>(params?: T) => {
  const minifiedParams =
    params &&
    Object.keys(params).reduce((acc, key) => {
      if (
        params &&
        params[key as keyof T] !== '0' &&
        params[key as keyof T] !== '' &&
        params[key as keyof T] !== undefined &&
        params[key as keyof T] !== 0 &&
        key !== 'page' &&
        key !== 'size'
      ) {
        if (key === 'statuses') {
          return {
            ...acc,
            statuses: (params[key as keyof T] as string[])?.length
              ? (params[key as keyof T] as string[]).join(',')
              : undefined,
          };
        }
        if (key === 'confirmed') {
          return {
            ...acc,
            confirmed: !!(params[key as keyof T] as boolean),
          };
        }

        return {
          ...acc,
          [key]: params[key as keyof T],
        };
      }
      return acc;
    }, {});

  return params ? minifiedParams : undefined;
};
