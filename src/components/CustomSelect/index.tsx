import Select, { Props } from 'react-select';
import { useTheme } from '@/hooks/theme-provider';
import { Text, rem } from '@mantine/core';

interface CustomSelectProps extends Props {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const CustomSelect = (props: CustomSelectProps) => {
  const { error, label } = props;
  const { theme } = useTheme();

  const dark = theme === 'dark';
  return (
    <div>
      {label && (
        <Text size="md" className="mb-2">
          {label}
        </Text>
      )}
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '43px',
            backgroundColor: dark ? '#25262b' : '#fff',
            border: error
              ? '1px solid #e03131'
              : `1px solid hsl(var(--border))`,
            '&:hover': {
              border: error
                ? '1px solid #e03131'
                : `1px solid hsl(var(--border))`,
            },
            outline: `1px solid hsl(var(--border))`,
            '&:focus': {
              border: error
                ? '1px solid #e03131'
                : `1px solid hsl(var(--border))`,
            },
            '&:active': {
              border: error
                ? '1px solid #e03131'
                : `1px solid hsl(var(--border))`,
            },
          }),
          input: (provided) => ({
            ...provided,
            color: dark ? '#fff' : '#000',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0 10px',
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: rem(250),
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            color: '#fff',
            backgroundColor: dark ? 'hsl(var(--background))' : '#fff',
            border: '1px solid hsl(var(--border))',
          }),
          option: (provided, { isFocused }) => ({
            ...provided,
            // eslint-disable-next-line no-nested-ternary
            backgroundColor: isFocused ? '#1A1B1E' : dark ? '#25262b' : '#fff',
            // backgroundColor: dark ? '#25262B' : '#fff',
            color: dark ? '#fff' : '#000',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: dark ? '#1A1B1E' : '#f5f5f5',
              color: dark ? '#fff' : '#000',
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: dark ? '#fff' : '#000',
          }),
        }}
        {...props}
        noOptionsMessage={() => 'لا يوجد نتائج'}
        placeholder="اختر"
        isRtl
        isClearable
        menuPortalTarget={document.body}
      />
    </div>
  );
};
