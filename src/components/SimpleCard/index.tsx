import { Card, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { parseISO, format } from 'date-fns';

interface SimpleCardProps {
  title: string;
  createdAt: string;
  onDelete: () => void;
}

export const SimpleCard = ({ createdAt, onDelete, title }: SimpleCardProps) => {
  return (
    <Card shadow="sm" padding="xl" radius="md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 ">
          <Text className="w-40" truncate>
            {title}
          </Text>
          <Text c="dimmed">{format(parseISO(createdAt), 'yyyy-MM-dd')}</Text>
        </div>
        <div className="flex">
          <IconTrash onClick={onDelete} className="text-primary" size={24} />
        </div>
      </div>
    </Card>
  );
};
