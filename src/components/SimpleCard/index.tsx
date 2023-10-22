import { Card } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { parseISO, format } from 'date-fns';

export const SimpleCard = () => {
  return (
    <Card shadow="sm" padding="xl" radius="md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p>asdwdw</p>
          {format(parseISO('2023-10-22T11:51:05.184Z'), 'yyyy-MM-dd')}
        </div>
        <IconTrash className="text-primary" size={24} />
      </div>
    </Card>
  );
};
