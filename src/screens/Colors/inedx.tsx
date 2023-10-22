import { AppLayout } from '@/components/AppLayout';
import { SimpleCard } from '@/components/SimpleCard';
import { useColors } from '@/hooks/useColors';
import { Grid, Pagination } from '@mantine/core';
import { useState } from 'react';
import { AddColor } from './add-color';
import { DeleteColor } from './delete-color';
import { EditColor } from './edit-color';

export const Colors = () => {
  const [page, setPage] = useState(1);

  const {
    data: colors = {
      data: [],
      pagesCount: 1,
    },
    isLoading,
    isError,
  } = useColors(page);

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <AddColor />
      <Grid gutter="lg">
        {colors.data.map((color) => (
          <Grid.Col
            key={color.id}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <SimpleCard
              {...color}
              cardDeleteChildren={<DeleteColor colorId={color.id} />}
              cardEditChildren={
                <EditColor colorId={color.id} title={color.title} />
              }
            />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-6">
        <Pagination value={page} onChange={setPage} total={colors.pagesCount} />
      </div>
    </AppLayout>
  );
};
