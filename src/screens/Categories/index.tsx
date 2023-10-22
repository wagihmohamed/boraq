import { AppLayout } from '@/components/AppLayout';
import { SimpleCard } from '@/components/SimpleCard';
import { useCategory } from '@/hooks/useCategory';
import { Grid, Pagination } from '@mantine/core';
import { useState } from 'react';
import { AddCategory } from './add-category';

export const Categories = () => {
  const [page, setPage] = useState(1);

  const {
    data: categories = {
      data: [],
      pagesCount: 1,
    },
    isLoading,
    isError,
  } = useCategory(page);

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <AddCategory />
      <Grid gutter="lg">
        {categories.data.map((category) => (
          <Grid.Col
            key={category.id}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <SimpleCard {...category} />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-6">
        <Pagination
          value={page}
          onChange={setPage}
          total={categories.pagesCount}
        />
      </div>
    </AppLayout>
  );
};
