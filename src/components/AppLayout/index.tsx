import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, ScrollArea, Loader } from '@mantine/core';
import { navSections } from '@/mockup/navSections';
import classes from './NavbarNested.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UserNavCard } from '../UserNavCard';
import { NotificationsList } from '../NotificationsList';

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const AppLayout = ({ children, isLoading, isError }: Props) => {
  const [opened, { toggle }] = useDisclosure();
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

  return (
    <AppShell
      header={{ height: 60, offset: true }}
      navbar={{ width: 280, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <div className="mr-auto ml-6">
            <NotificationsList />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" mt={0} py={30}>
        <AppShell.Section grow my="lg" component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </AppShell.Section>
        <AppShell.Section>
          <UserNavCard />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main pt={100}>{handleRender()}</AppShell.Main>
    </AppShell>
  );
};
