import { AppLayout } from '@/components/AppLayout';
import { useTenants } from '@/hooks/useTenants';
import { CustomTenantCard } from './tenant-card';
import { Grid } from '@mantine/core';

export const TenantsScreen = () => {
  const {
    data: tenants = {
      data: [],
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
    </AppLayout>
  );
};
