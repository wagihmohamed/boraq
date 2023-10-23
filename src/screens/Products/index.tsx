import { AppLayout } from '@/components/AppLayout';
import { Button, Grid, Pagination } from '@mantine/core';
import { CustomProductCard } from './custom-product-card';
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const navigation = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: products = {
      data: [],
      pagesCount: 0,
    },
    isLoading,
    isError,
  } = useProducts(page);
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex mb-6 items-center gap-6">
        <h1 className="text-2xl md:text-4xl">المنتجات</h1>
        <Button
          onClick={() => {
            navigation('/home/add');
          }}
          size="lg"
          variant="outline"
        >
          اضافة منتج
        </Button>
      </div>
      <Grid gutter="md">
        {products.data.map((product) => (
          <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 4 }}>
            <CustomProductCard {...product} />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-10">
        <Pagination
          total={products.pagesCount}
          value={page}
          onChange={setPage}
        />
      </div>
    </AppLayout>
  );
};
