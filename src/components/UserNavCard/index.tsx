import {
  UnstyledButton,
  Menu,
  Group,
  Text,
  Avatar,
  useMantineTheme,
  ActionIcon,
  rem,
} from '@mantine/core';

import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconSwitchHorizontal,
  IconDots,
  IconChevronLeft,
  IconSunHigh,
  IconMoon,
} from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useTheme } from '@/hooks/theme-provider';
import { useAuth } from '@/store/authStore';

export const UserNavCard = () => {
  const theme = useMantineTheme();
  const { logout, name, username } = useAuth();
  const { theme: displayTheme, setTheme } = useTheme();
  return (
    <UnstyledButton component="a" className={classes.user}>
      <Group>
        <Avatar radius="xl">
          {name ? name[0].toUpperCase() + name[1].toUpperCase() : ''}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text ta="start" size="sm" fw={500}>
            {name}
          </Text>

          <Text ta="start" c="dimmed" size="xs">
            {username}
          </Text>
        </div>
        <Group justify="center">
          <Menu
            withArrow
            width={300}
            position="bottom"
            transitionProps={{ transition: 'pop' }}
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant="default">
                <IconDots
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                rightSection={
                  <IconChevronLeft
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                <Group>
                  <Avatar radius="xl">
                    {name ? name[0].toUpperCase() + name[1].toUpperCase() : ''}
                  </Avatar>

                  <div>
                    <Text fw={500}>{name}</Text>
                    <Text size="xs" c="dimmed">
                      {username}
                    </Text>
                  </div>
                </Group>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.red[6]}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.yellow[6]}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.blue[6]}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setTheme(displayTheme === 'dark' ? 'light' : 'dark');
                }}
                leftSection={
                  displayTheme === 'dark' ? (
                    <IconSunHigh
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  ) : (
                    <IconMoon
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  )
                }
              >
                Display Mode
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                onClick={logout}
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </UnstyledButton>
  );
};
