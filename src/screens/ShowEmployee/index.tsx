import { AppLayout } from '@/components/AppLayout';
import { Autocomplete, Button, MultiSelect, TextInput } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ShowEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employeeData = {
    name: 'وجيه محمد',
    phone: '07912345678',
    salary: '1000',
    branch: 'بغداد',
    store: 'مخزن البصرة',
    job: 'مدير الشركة',
    roles: ['مدير الشركة', 'مدير فرع', 'مدير حسابات'],
    permissions: ['اضافة صفحة', 'اضافة طلبات', 'اضافة عميل'],
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/employees');
          }}
        />
        <h1 className="text-3xl font-semibold">بيانات موظف</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData.name}
          disabled
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData.phone}
          disabled
        />
        <TextInput
          label="الأجرة"
          type="number"
          placeholder=""
          size="md"
          className="w-full"
          value={employeeData.salary}
          disabled
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={['بغداد', 'البصرة', 'النجف']}
          value={employeeData.branch}
          disabled
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          data={['مخزن البصرة', 'مخزن النجف', 'مخزن بغداد', 'مخزن الكرخ']}
          value={employeeData.store}
          disabled
        />
        <Autocomplete
          label="الوظيفة"
          placeholder="اختار الوظيفة"
          data={[
            'مدير الشركة',
            'مدير فرع',
            'مدير حسابات',
            'محاسب',
            'موظف طوارئ',
            'مدخل بيانات',
            'موظف مخازن',
            'موظف استعلامات',
            'مندوب استلام',
          ]}
          value={employeeData.job}
          disabled
        />
        <MultiSelect
          label="الادوار"
          placeholder="اختار الادوار"
          data={[
            'مدير الشركة',
            'مدير فرع',
            'مدير حسابات',
            'محاسب',
            'موظف طوارئ',
            'مدخل بيانات',
            'موظف مخازن',
            'موظف استعلامات',
            'مندوب استلام',
          ]}
          value={employeeData.roles}
          disabled
        />
        <MultiSelect
          label="الصلاحيات"
          placeholder="اختار الصلاحيات"
          data={[
            'احالة الطلبات الي مندوب',
            'اضافة صفحة',
            'اضافة طلبات',
            'اضافة عميل',
            'تعديل اسم عميل',
            'تعديل المبلغ الكلي للطلبية',
            'تغير الحالة',
            'تغير حالة الطلبية المغلقة',
            'قفل حالة الطلبية',
            'مسح الاشعارات',
            'مسح الطلبيات',
            'مسح الكشوفات',
            'مسح كشوفات الشركات',
            'مسح كشوفات المخازن',
            'مسح كشوفات العملاء',
            'مسح كشوفات محافظة',
            'مسح كشوفات مندوبين',
          ]}
          value={employeeData.permissions}
          disabled
        />
        <Button
          type="submit"
          onClick={() => {
            navigate(`/employees/${id}/edit`);
          }}
          fullWidth
          mt="xl"
          size="md"
        >
          تعديل
        </Button>
        <Button
          onClick={() => {
            navigate('/employees');
          }}
          type="submit"
          variant="outline"
          fullWidth
          mt="xl"
          size="md"
        >
          العودة
        </Button>
      </div>
    </AppLayout>
  );
};
