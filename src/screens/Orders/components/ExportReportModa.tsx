/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, Grid } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import { useOrdersStore } from '@/store/ordersStore';
import { reportTypeArray } from '@/lib/reportTypeArabicNames';
import { useClients } from '@/hooks/useClients';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useBranches } from '@/hooks/useBranches';
import { useRepositories } from '@/hooks/useRepositories';

import { useEmployees } from '@/hooks/useEmployees';
import { useTenants } from '@/hooks/useTenants';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createReportSchema } from './ExportReportModa.zod';
import {
  governorateArabicNames,
  governorateArray,
} from '@/lib/governorateArabicNames ';
import { CreateReportPayload } from '@/services/createReport';
import { useEffect } from 'react';

export const ExportReportModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { orders: selectedOrders, deleteAllOrders } = useOrdersStore();

  const form = useForm({
    validate: zodResolver(createReportSchema),
    initialValues: {
      type: '' as z.infer<typeof createReportSchema>['type'],
      clientID: 0,
      storeID: 0,
      branchID: 0,
      repositoryID: 0,
      governorate: '',
      deliveryAgentID: 0,
      companyID: 0,
      ordersIDs: selectedOrders.map((order) => order.id),
    },
  });

  const {
    data: clientsData = {
      data: [],
    },
  } = useClients({ size: 500 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 500 });

  const {
    data: branchesData = {
      data: [],
    },
  } = useBranches({ size: 500 });
  const {
    data: repositoriesData = {
      data: [],
    },
  } = useRepositories({ size: 500 });
  const {
    data: tenantsData = {
      data: [],
    },
  } = useTenants({ size: 500 });

  const {
    data: deliveryAgentsData = {
      data: [],
    },
  } = useEmployees({ size: 500, roles: ['DELIVERY_AGENT'] });

  const { mutateAsync, isLoading } = useCreateReport();

  useEffect(() => {
    form.setFieldValue(
      'ordersIDs',
      selectedOrders.map((order) => order.id)
    );
  }, [selectedOrders]);

  const handleCreateReport = (values: z.infer<typeof createReportSchema>) => {
    let mutationParams: CreateReportPayload = {
      type: values.type,
      ordersIDs: selectedOrders.map((order) => Number(order.id)),
    };

    switch (values.type) {
      case 'GOVERNORATE':
        mutationParams = {
          ...mutationParams,
          governorate:
            values.governorate as keyof typeof governorateArabicNames,
        };
        break;
      case 'BRANCH':
        mutationParams = {
          ...mutationParams,
          branchID: values.branchID,
        };
        break;
      case 'CLIENT':
        mutationParams = {
          ...mutationParams,
          clientID: values.clientID,
          storeID: values.storeID,
        };
        break;
      case 'REPOSITORY':
        mutationParams = {
          ...mutationParams,
          repositoryID: values.repositoryID,
        };
        break;
      case 'DELIVERY_AGENT':
        mutationParams = {
          ...mutationParams,
          deliveryAgentID: values.deliveryAgentID,
        };
        break;
      case 'COMPANY':
        mutationParams = {
          ...mutationParams,
          companyID: values.companyID,
        };
        break;
      default:
        break;
    }
    toast.promise(
      mutateAsync(mutationParams, {
        onSuccess: () => {
          close();
          form.reset();
          deleteAllOrders();
        },
      }),
      {
        loading: 'جاري تصدير الكشف',
        success: 'تم تصدير الكشف بنجاح',
        error: (error) => error.response?.data.message || 'حدث خطأ ما',
      }
    );
  };

  const reportType = form.values.type;

  return (
    <>
      <Modal opened={opened} onClose={close} title="تصدير الكشف" centered>
        <form
          className="space-y-3"
          onSubmit={form.onSubmit(handleCreateReport)}
        >
          <Select
            allowDeselect
            label="نوع الكشف"
            searchable
            clearable
            {...form.getInputProps('type')}
            error={form.errors.type && 'الرجاء اختيار النوع'}
            placeholder="اختر نوع الكشف"
            data={reportTypeArray}
          />
          {reportType === 'CLIENT' && (
            <>
              <Select
                allowDeselect
                label="العميل"
                searchable
                clearable
                placeholder="اختر العميل"
                data={getSelectOptions(clientsData.data)}
                {...form.getInputProps('clientID')}
              />
              <Select
                allowDeselect
                label="المتجر"
                searchable
                clearable
                placeholder="اختر المتجر"
                data={getSelectOptions(storesData.data)}
                {...form.getInputProps('storeID')}
              />
            </>
          )}
          {reportType === 'BRANCH' && (
            <Select
              allowDeselect
              label="الفرع"
              searchable
              clearable
              placeholder="اختر الفرع"
              data={getSelectOptions(branchesData.data)}
              {...form.getInputProps('branchID')}
            />
          )}
          {reportType === 'REPOSITORY' && (
            <Select
              allowDeselect
              label="المخزن"
              searchable
              clearable
              placeholder="اختر المخزن"
              data={getSelectOptions(repositoriesData.data)}
              {...form.getInputProps('repositoryID')}
            />
          )}
          {reportType === 'GOVERNORATE' && (
            <Select
              allowDeselect
              label="المحافظة"
              searchable
              clearable
              placeholder="اختر المحافظة"
              data={governorateArray}
              {...form.getInputProps('governorate')}
            />
          )}
          {reportType === 'DELIVERY_AGENT' && (
            <Select
              allowDeselect
              label="مندوب التوصيل"
              searchable
              clearable
              placeholder="اختر مندوب التوصيل"
              data={getSelectOptions(deliveryAgentsData.data)}
              {...form.getInputProps('deliveryAgentID')}
            />
          )}
          {reportType === 'COMPANY' && (
            <Select
              allowDeselect
              label="الشركة"
              searchable
              clearable
              placeholder="اختر الشركة"
              data={getSelectOptions(tenantsData.data)}
              {...form.getInputProps('companyID')}
            />
          )}
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Button
                loading={isLoading}
                disabled={isLoading || !selectedOrders.length}
                fullWidth
                type="submit"
              >
                تصدير
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Button
                onClick={() => {
                  close();
                }}
                fullWidth
                variant="outline"
              >
                العودة
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Button disabled={!selectedOrders.length} onClick={open}>
        تصدير الكشف
      </Button>
      <p>
        {selectedOrders.length
          ? `تم تحديد ${selectedOrders.length} طلب`
          : 'لم يتم تحديد أي طلب'}
      </p>
    </>
  );
};
