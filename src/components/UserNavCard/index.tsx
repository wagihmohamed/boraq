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

export const UserNavCard = () => {
  const theme = useMantineTheme();
  const { theme: displayTheme, setTheme } = useTheme();
  return (
    <UnstyledButton component="a" className={classes.user}>
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            وجيه محمد
          </Text>

          <Text c="dimmed" size="xs">
            hspoonlicker@outlook.com
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
                  <Avatar
                    radius="xl"
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  />

                  <div>
                    <Text fw={500}>وجيه محمد</Text>
                    <Text size="xs" c="dimmed">
                      neggshaker@mantine.dev
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
