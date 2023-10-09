import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#ffebea',
  '#fbd4d4',
  '#f4a6a6',
  '#ee7575',
  '#ea4d4a',
  '#e73430',
  '#e72722',
  '#cd1b17',
  '#b71312',
  '#a1060d',
];

export const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
});
