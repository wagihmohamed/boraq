export const getSelectOptions = <T extends { id: string; name: string }>(
  data: T[]
): { value: string; label: string }[] => {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
