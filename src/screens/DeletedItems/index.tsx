import { AppLayout } from '@/components/AppLayout';
import { Tabs } from '@mantine/core';

import { DeletedOrdersView } from './views/orders/OrdersView';
import { useOrders } from '@/hooks/useOrders';
import { useState } from 'react';
import { DeletedStoresView } from './views/Stores/StoreView';
import { DeletedReportsView } from './views/Reports';

type TabsTypes = 'ORDERS' | 'REPORTS' | 'CLIENTS' | 'STORES' | 'EMPLOYEES';

export const DeletedScreen = () => {
  const { isInitialLoading, isError } = useOrders();
  const [activeTab, setActiveTab] = useState<TabsTypes>('ORDERS');

  return (
    <AppLayout isLoading={isInitialLoading} isError={isError}>
      <Tabs
        keepMounted={false}
        variant="pills"
        radius="md"
        defaultValue="STORES"
        value={activeTab}
        onChange={(e: TabsTypes | null) => {
          if (e) {
            setActiveTab(e);
          }
        }}
      >
        <Tabs.List grow className="mb-12">
          <Tabs.Tab value="ORDERS">الطلبات المحذوفة</Tabs.Tab>
          <Tabs.Tab value="STORES">
            <div>المتاجر المحذوفة</div>
          </Tabs.Tab>
          <Tabs.Tab value="REPORTS">
            <div>الكشوفات المحذوفة</div>
          </Tabs.Tab>
          <Tabs.Tab value="CLIENTS">
            <div>العملاء المحذوفين</div>
          </Tabs.Tab>
          <Tabs.Tab value="EMPLOYEES">
            <div>الموظفين المحذوفين</div>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ORDERS">
          <DeletedOrdersView />
        </Tabs.Panel>
        <Tabs.Panel value="STORES">
          <DeletedStoresView />
        </Tabs.Panel>
        <Tabs.Panel value="REPORTS">
          <DeletedReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="CLIENTS">العملاء المحذوفين</Tabs.Panel>
        <Tabs.Panel value="EMPLOYEES">الموظفين المحذوفين</Tabs.Panel>
      </Tabs>
    </AppLayout>
  );
};
