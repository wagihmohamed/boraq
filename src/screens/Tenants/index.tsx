import { AppLayout } from '@/components/AppLayout';
import { useTenants } from '@/hooks/useTenants';
import { CustomTenantCard } from './tenant-card';
import { Grid, Pagination } from '@mantine/core';

export const TenantsScreen = () => {
  const {
    data: tenants = {
      data: [],
      pagesCount: 0,
      page: 0,
    },
    isError,
    isLoading,
  } = useTenants();
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <h1 className="mb-6">الشركات</h1>
      <Grid gutter="md">
        {tenants.data.map((tenant) => (
          <Grid.Col key={tenant.id} span={{ base: 12, md: 6, lg: 4 }}>
            <CustomTenantCard {...tenant} />
          </Grid.Col>
        ))}
      </Grid>
      <div className="flex justify-center mt-10">
        <Pagination total={tenants.pagesCount} value={tenants.page} />
      </div>
    </AppLayout>
  );
};
