import { AppLayout } from '@/components/AppLayout';
import { Grid, Pagination } from '@mantine/core';
import { CustomBannerCard } from './custom-banner-card';
import { useState } from 'react';
import { Filters } from '@/services/getEmployeesService';
import { useBanners } from '@/hooks/useBanners';
import { AddBannerModal } from './add-banner-modal';

export const Banners = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: banners = {
      data: [],
      pagesCount: 1,
      page: 1,
    },
    isLoading,
    isError,
  } = useBanners(filters);

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <div className="flex mb-6 items-center gap-6">
        <AddBannerModal />
      </div>
      <Grid gutter="md">
        {banners.data.map((banner) => (
          <Grid.Col
            key={banner.id}
            span={{ base: 12, md: 6, lg: 3, sm: 4, xs: 6 }}
          >
            <CustomBannerCard {...banner} />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-10">
        <Pagination
          total={banners.pagesCount}
          value={banners.page}
          onChange={(page) => {
            setFilters({ ...filters, page });
          }}
        />
      </div>
    </AppLayout>
  );
};
