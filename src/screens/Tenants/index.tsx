import { AppLayout } from '@/components/AppLayout';
import { useTenants } from '@/hooks/useTenants';
import { CustomTenantCard } from './tenant-card';
import { Button, Grid, Pagination } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const TenantsScreen = () => {
  const navigate = useNavigate();
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
      <div className="flex mb-6 items-center gap-6">
        <h1 className="text-2xl md:text-4xl">الشركات</h1>
        <Button
          onClick={() => {
            navigate('/tenants/add');
          }}
          size="lg"
          variant="outline"
        >
          اضافة شركة
        </Button>
      </div>
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
