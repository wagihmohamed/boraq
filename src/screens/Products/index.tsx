import { AppLayout } from '@/components/AppLayout';
import { Button, Grid, Pagination } from '@mantine/core';
import { CustomProductCard } from './custom-product-card';
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import { Filters } from '@/services/getEmployeesService';
import { hideChildrenBasedOnRole } from '@/hooks/useAuthorized';

export const Products = () => {
  const navigation = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: products = {
      data: [],
      pagesCount: 1,
      page: 1,
    },
    isLoading,
    isError,
  } = useProducts(filters);

  const addProductButton = (
    <Button
      onClick={() => {
        navigation('/home/add');
      }}
      size="lg"
      variant="outline"
      className="mb-8"
    >
      اضافة منتج
    </Button>
  );

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      {hideChildrenBasedOnRole(['ADMIN', 'ADMIN_ASSISTANT'], addProductButton)}
      <Grid gutter="md">
        {products.data.map((product) => (
          <Grid.Col
            key={product.id}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <CustomProductCard {...product} />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-10">
        <Pagination
          total={products.pagesCount}
          value={products.page}
          onChange={(page) => {
            setFilters({ ...filters, page });
          }}
        />
      </div>
    </AppLayout>
  );
};
