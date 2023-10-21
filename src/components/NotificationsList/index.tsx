import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { Button, Loader, Menu, ScrollArea, Text, rem } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { IconBell } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';

export const NotificationsList = () => {
  const {
    data: notifications,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotifications();
  const flattenNotifications = notifications?.pages
    ?.map((item) => item.data)
    ?.flat();
  const isUnsean = flattenNotifications?.some((item) => !item);

  const thirdLastNotificationRef = useRef<HTMLDivElement>(null);
  const { entry, ref } = useIntersection({
    root: thirdLastNotificationRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <Menu position="bottom-end" shadow="md" width={rem(338)}>
      <Menu.Target>
        <Button variant="subtle">
          <IconBell className={isUnsean ? 'text-primary' : ''} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>اخر الاشعارات</Menu.Label>
        <ScrollArea h={rem(300)}>
          {flattenNotifications?.map((item, index) => {
            if (index === flattenNotifications.length - 3) {
              return (
                <Menu.Item key={item.id} ref={ref}>
                  <div
                    className={cn(
                      'flex flex-col border border-primary rounded p-1 gap-3 mb-2',
                      !item.seen && 'bg-primary/30'
                    )}
                  >
                    <p className="truncate">{item.title}</p>
                    <p className="truncate">{item.content}</p>
                  </div>
                </Menu.Item>
              );
            }
            return (
              <Menu.Item key={item.id}>
                <div
                  className={cn(
                    'flex flex-col border border-primary rounded p-1 gap-3 mb-2 w-72',
                    !item.seen && 'bg-primary/30'
                  )}
                >
                  <p>{item.title}</p>
                  <Text truncate="end">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nemo exercitationem excepturi fugit perspiciatis hic
                    consectetur eius aut at iste, tempore incidunt totam
                    voluptatum corrupti inventore, sed explicabo ullam
                    blanditiis?
                  </Text>
                </div>
              </Menu.Item>
            );
          })}
          <div className="flex justify-center">
            {isFetchingNextPage && <Loader />}
          </div>
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
};
