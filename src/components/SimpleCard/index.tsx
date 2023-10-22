import { DeleteSize } from '@/screens/Sizes/delete-size';
import { EditSize } from '@/screens/Sizes/edit-size';
import { Card, Text } from '@mantine/core';
import { parseISO, format } from 'date-fns';

interface SimpleCardProps {
  title: string;
  createdAt: string;
  id: string;
}

export const SimpleCard = ({ createdAt, title, id }: SimpleCardProps) => {
  return (
    <Card shadow="sm" padding="xl" radius="md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 ">
          <Text className="w-40" truncate>
            {title}
          </Text>
          <Text c="dimmed">{format(parseISO(createdAt), 'yyyy-MM-dd')}</Text>
        </div>
        <div className="flex items-start gap-2">
          <EditSize sizeId={id} title={title} />
          <DeleteSize sizeId={id} />
        </div>
      </div>
    </Card>
  );
};
