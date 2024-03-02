// eslint-disable-next-line import/no-cycle
import { columns } from './components/columns';
import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { SheetUploader } from './components/SheetUploader';
import * as XLSX from 'xlsx';
import { DataTable } from './components/Table';
import { Button, Select, rem } from '@mantine/core';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderPayload, createOrderService } from '@/services/createOrder';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { usePublicLocations } from '@/hooks/usePublicLocations';

export interface OrderSheet {
  orderNumber: string;
  phoneNumber: string;
  address: string;
  city: string;
  customerName: string;
  notes: string;
  total: string;
  Governorate: string;
}

interface SheetFile {
  '#': string;
  العنوان: string;
  المنطقة: string;
  'اسم العميل': string;
  الملاحظات: string;
  'رقم الهاتف': string;
  الاجمالي: string;
  المحافظة: string;
}

export const OrdersSheet = () => {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderSheet[]>([]);
  const { data: publicLocationData } = usePublicLocations();

  const handleDrop = async (files: File[]) => {
    setFiles(files);
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json: SheetFile[] = XLSX.utils.sheet_to_json(sheet);
      const transformedJson: OrderSheet[] = json.map((order) => ({
        orderNumber: order['#']?.toString(),
        address: order['العنوان'],
        city: order['المنطقة'],
        customerName: order['اسم العميل'],
        notes: order['الملاحظات'],
        phoneNumber: order['رقم الهاتف'],
        total: order['الاجمالي'],
        Governorate: order['المحافظة'],
      }));

      setOrders(transformedJson);
    };
  };
  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 1000, minified: true });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: (data: CreateOrderPayload) => {
      return createOrderService(data);
    },
    onSuccess: () => {
      toast.success('تم اضافة الطلبات بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ordersStatistics'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const publicLocationMap: Record<string, number> | undefined =
    publicLocationData?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr.id,
      }),
      {}
    );

  const governorateMapArabicToEnglish: Record<string, string> = {
    الأنبار: 'AL_ANBAR',
    بابل: 'BABIL',
    بغداد: 'BAGHDAD',
    البصرة: 'BASRA',
    'ذي قار': 'DHI_QAR',
    القادسية: 'AL_QADISIYYAH',
    ديالى: 'DIYALA',
    دهوك: 'DUHOK',
    أربيل: 'ERBIL',
    كربلاء: 'KARBALA',
    كركوك: 'KIRKUK',
    ميسان: 'MAYSAN',
    المثنى: 'MUTHANNA',
    النجف: 'NAJAF',
    نينوى: 'NINAWA',
    'صلاح الدين': 'SALAH_AL_DIN',
  };

  const handleCreateOrders = () => {
    if (!selectedStore) {
      toast.error('يجب اختيار المتجر');
      return;
    }
    const data = orders.map((order) => ({
      withProducts: false,
      storeID: Number(selectedStore),
      receiptNumber: Number(order.orderNumber),
      locationID: publicLocationMap?.[order.city] || 1,
      governorate: governorateMapArabicToEnglish[order.Governorate],
      notes: order.notes,
      recipientName: order.customerName,
      recipientPhones: [order.phoneNumber],
      recipientAddress: order.address,
      totalCost: Number(order.total),
    }));

    createOrder(data);
  };

  return (
    <AppLayout>
      <Select
        searchable
        className="mb-4"
        label="المتجر"
        placeholder="اختار المتجر"
        limit={50}
        data={getSelectOptions(storesData.data)}
        value={selectedStore}
        onChange={setSelectedStore}
      />
      <SheetUploader
        onDelete={() => {
          setFiles([]);
          setOrders([]);
        }}
        files={files}
        onDrop={handleDrop}
      />
      <div className="flex justify-center mb-6">
        <Button
          w={rem(200)}
          onClick={handleCreateOrders}
          loading={isLoading}
          // disabled={isLoading || !orders.length}
        >
          اضافة الطلبات
        </Button>
      </div>
      <DataTable data={orders} columns={columns} />
    </AppLayout>
  );
};
