import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Loader,
  rem,
  Text,
} from '@mantine/core';
import { navSections } from '@/mockup/navSections';
import classes from './NavbarNested.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UserNavCard } from '../UserNavCard';
import { NotificationsList } from '../NotificationsList';
import { useAuth } from '@/store/authStore';

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const AppLayout = ({ children, isLoading, isError }: Props) => {
  const { companyName } = useAuth();
  const pathName = useLocation().pathname;
  const [active, setActive] = useState(
    navSections.find((item) => item.link === pathName)?.label || ''
  );
  const links = navSections.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const handleRender = () => {
    if (isLoading) {
      return (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-primary text-3xl">
            حدث خطأ ما، يرجى المحاولة مرة أخرى
          </h1>
        </div>
      );
    }

    return children;
  };
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: rem(60), offset: true }}
      navbar={{
        width: rem(230),
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" w="100%" px="md" justify="space-between">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          {companyName && (
            <Text ta="center" size="xl" fw={700}>
              {companyName}
            </Text>
          )}
          <div className="-ml-2">
            <NotificationsList />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" mt={0} py={rem(30)}>
        <AppShell.Section grow my="lg" component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </AppShell.Section>
        <AppShell.Section>
          <UserNavCard />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main pt={rem(100)}>{handleRender()}</AppShell.Main>
    </AppShell>
  );
};
