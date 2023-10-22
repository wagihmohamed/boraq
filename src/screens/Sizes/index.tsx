import { AppLayout } from '@/components/AppLayout';
import { SimpleCard } from '@/components/SimpleCard';
import { useSizes } from '@/hooks/useSizes';
import { Grid } from '@mantine/core';

export const Sizes = () => {
  const {
    data: sizes = {
      data: [],
    },
    isLoading,
    isError,
  } = useSizes();
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <Grid gutter="lg">
        {sizes.data.map((size) => (
          <Grid.Col
            key={size.id}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <SimpleCard {...size} onDelete={() => {}} />
          </Grid.Col>
        ))}
      </Grid>
    </AppLayout>
  );
};
