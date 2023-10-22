import { AppLayout } from '@/components/AppLayout';
import { SimpleCard } from '@/components/SimpleCard';
import { useSizes } from '@/hooks/useSizes';
import { Grid, Pagination } from '@mantine/core';
import { useState } from 'react';
import { AddSize } from './add-size';

export const Sizes = () => {
  const [page, setPage] = useState(1);

  const {
    data: sizes = {
      data: [],
      pagesCount: 1,
    },
    isLoading,
    isError,
  } = useSizes(page);
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <AddSize />
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
      <div className="flex justify-center mt-6">
        <Pagination value={page} onChange={setPage} total={sizes.pagesCount} />
      </div>
    </AppLayout>
  );
};
