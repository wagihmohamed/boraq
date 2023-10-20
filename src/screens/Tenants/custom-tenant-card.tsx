import { Tenant } from '@/services/getTenants';
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Menu,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';

interface CustomTenantCardProps extends Tenant {}

export const CustomTenantCard = ({
  logo,
  name,
  registrationText,
  website,
  phone,
}: CustomTenantCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href={website}>
        <Image
          src={logo}
          //   src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          fallbackSrc="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt={name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>

        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
            >
              تعديل
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
              color="red"
            >
              مسح
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Text size="sm" c="dimmed">
        {phone}
      </Text>
      <Text size="sm" c="dimmed" my={10} truncate="end">
        {registrationText}
      </Text>

      <Button variant="outline" fullWidth mt="md" radius="md">
        عرض التفاصيل
      </Button>
    </Card>
  );
};
