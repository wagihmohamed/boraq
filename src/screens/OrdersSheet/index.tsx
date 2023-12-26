// eslint-disable-next-line import/no-cycle
import { columns } from './components/columns';
import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { SheetUploader } from './components/SheetUploader';
import * as XLSX from 'xlsx';
import { DataTable } from './components/Table';

export interface OrderSheet {
  orderNumber: string;
  phoneNumber: string;
  city: string;
  customerName: string;
  notes: string;
  total: string;
  town: string;
}

interface SheetFile {
  '#': string;
  Address: string;
  City: string;
  'Customer Name': string;
  Notes: string;
  'Phone Number': string;
  Total: string;
  Town: string;
}

export const OrdersSheet = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [orders, setOrders] = useState<OrderSheet[]>([]);

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
        orderNumber: order['#'].toString(),
        phoneNuber: order.Address,
        city: order.City,
        customerName: order['Customer Name'],
        notes: order.Notes,
        phoneNumber: order['Phone Number'],
        total: order.Total,
        town: order.Town,
      }));
      setOrders(transformedJson);
    };
  };

  return (
    <AppLayout>
      <SheetUploader
        onDelete={() => {
          setFiles([]);
          setOrders([]);
        }}
        files={files}
        onDrop={handleDrop}
      />
      <DataTable data={orders} columns={columns} />
    </AppLayout>
  );
};
