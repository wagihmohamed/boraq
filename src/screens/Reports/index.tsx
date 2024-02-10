import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Paper, Tabs } from '@mantine/core';
import { ClientReportsView } from './components/TabsViews/ClientReportsView';
import { CompanyReportsView } from './components/TabsViews/CompanyReportsView';
import { BranchReportsView } from './components/TabsViews/BranchReportsView';
import { RepositoryReportsView } from './components/TabsViews/RepositoryReportsView';
import { GovernorateReportsView } from './components/TabsViews/GovernorateReportsView';
import { DeliveryAgentReportsView } from './components/TabsViews/DeliveryAgentReportsView';

type ReportsTabsTypes =
  | 'COMPANY'
  | 'REPOSITORY'
  | 'GOVERNORATE'
  | 'DELIVERY_AGENT'
  | 'BRANCH'
  | 'CLIENT';

export const reportsFilterInitialState: ReportsFilters = {
  page: 1,
  size: 10,
  client_id: '',
  delivery_agent_id: '',
  end_date: '',
  governorate: '',
  pagesCount: 0,
  sort: '',
  start_date: '',
  status: '',
  store_id: '',
  created_by_id: '',
};

export const ReportsScreen = () => {
  const [activeTab, setActiveTab] = useState<ReportsTabsTypes>('CLIENT');

  const { isError, isInitialLoading } = useReports();

  return (
    <AppLayout isLoading={isInitialLoading} isError={isError}>
      <Tabs
        keepMounted={false}
        variant="pills"
        radius="md"
        defaultValue="COMPANY"
        value={activeTab}
        onChange={(e: ReportsTabsTypes | null) => {
          if (e) {
            setActiveTab(e);
          }
        }}
      >
        <Paper className="mb-6 py-2 rounded px-3" withBorder>
          <Tabs.List grow>
            <Tabs.Tab value="COMPANY">شركة</Tabs.Tab>
            <Tabs.Tab value="GOVERNORATE">محافظة</Tabs.Tab>
            <Tabs.Tab value="BRANCH">فرع</Tabs.Tab>
            <Tabs.Tab value="REPOSITORY">مخزن</Tabs.Tab>
            <Tabs.Tab value="CLIENT">عميل</Tabs.Tab>
            <Tabs.Tab value="DELIVERY_AGENT">مندوب</Tabs.Tab>
          </Tabs.List>
        </Paper>
        <Tabs.Panel value="CLIENT">
          <ClientReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="COMPANY">
          <CompanyReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="BRANCH">
          <BranchReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="REPOSITORY">
          <RepositoryReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="GOVERNORATE">
          <GovernorateReportsView />
        </Tabs.Panel>
        <Tabs.Panel value="DELIVERY_AGENT">
          <DeliveryAgentReportsView />
        </Tabs.Panel>
      </Tabs>
    </AppLayout>
  );
};
