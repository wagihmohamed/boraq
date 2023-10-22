import { Card, Text } from '@mantine/core';
import { parseISO, format } from 'date-fns';

interface SimpleCardProps {
  title: string;
  createdAt: string;
  cardEditChildren?: React.ReactNode;
  cardDeleteChildren?: React.ReactNode;
}

export const SimpleCard = ({
  createdAt,
  title,
  cardDeleteChildren,
  cardEditChildren,
}: SimpleCardProps) => {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 ">
          <Text className="w-40" truncate>
            {title}
          </Text>
          <Text c="dimmed">{format(parseISO(createdAt), 'yyyy-MM-dd')}</Text>
        </div>
        <div className="flex items-start gap-2">
          {cardEditChildren}
          {cardDeleteChildren}
        </div>
      </div>
    </Card>
  );
};

SimpleCard.displayName = 'SimpleCard';
