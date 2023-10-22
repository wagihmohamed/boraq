import { AppLayout } from '@/components/AppLayout';
import { SimpleCard } from '@/components/SimpleCard';
import { Grid } from '@mantine/core';

export const Sizes = () => {
  return (
    <AppLayout>
      <Grid gutter="lg">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Grid.Col
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <SimpleCard
              createdAt="2021-10-10"
              onDelete={() => {}}
              title="Card Title"
            />
          </Grid.Col>
        ))}
      </Grid>
    </AppLayout>
  );
};
