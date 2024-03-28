/* eslint-disable react-hooks/rules-of-hooks */
import { Employee } from '@/services/getEmployeesService';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { DeleteEmployee } from './DeleteEmployee';
import { Link } from 'react-router-dom';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Avatar, Menu } from '@mantine/core';
import { AssignClientAssistantToStores } from './AssignClientAssistantToStores';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { AssignInquiryEmployeeBranches } from './AssignInquiryEmployeeBranches';
import { AssignInquiryEmployeeLocations } from './AssignInquiryEmployeeLocations';
import { AssignInquiryEmployeeStores } from './AssignInquiryEmployeeStores';
import { AssignInquiryEmployeeCompanies } from './AssignInquiryEmployeeCompanies';
import { AssignInquiryEmployeeGovernorate } from './AssignInquiryEmployeeGovernorate';
import { AssignInquiryEmployeeStatuses } from './AssignInquiryEmployeeStatuses';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'avatar',
    header: 'الصورة',
    cell: ({ row }) => {
      const employee = row.original;
      return <Avatar src={employee.avatar} size="lg" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'username',
    header: 'اسم المستخدم',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'role',
    header: 'الوظيفة',
    accessorFn: ({ role }) => {
      return rolesArabicNames[role];
    },
  },
  {
    accessorKey: 'branch',
    header: 'الفرع',
    accessorFn: ({ branch }) => {
      return branch?.name ?? 'لا يوجد';
    },
  },
  {
    accessorKey: 'createdBy.name',
    header: 'المنشئ',
    accessorFn: ({ createdBy }) => {
      return createdBy?.name ?? 'لا يوجد';
    },
  },
  {
    header: 'المتاجر',
    cell: ({ row }) => {
      const { role, id, managedStores } = row.original;
      if (role === 'CLIENT_ASSISTANT') {
        const stringifiedManagedStores = managedStores.map((store) =>
          store.id.toString()
        );
        return (
          <AssignClientAssistantToStores
            id={id}
            managedStores={stringifiedManagedStores}
          />
        );
      }
      return '--';
    },
  },
  {
    accessorKey: 'repository',
    header: 'المخزن',
    accessorFn: ({ repository }) => {
      return repository?.name ?? 'لا يوجد';
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, role } = row.original;
      const [deleteOpened, { open: openDelete, close: closeDelete }] =
        useDisclosure(false);
      const [
        inquiryBranchesOpened,
        { open: openInquiryBranches, close: closeInquiryBranches },
      ] = useDisclosure(false);
      const [
        inquiryStatusesOpened,
        { open: openInquiryStatuses, close: closeInquiryStatuses },
      ] = useDisclosure(false);
      const [
        inquiryGovernoratesOpened,
        { open: openInquiryGovernorates, close: closeInquiryGovernorates },
      ] = useDisclosure(false);
      const [
        inquiryStoresOpened,
        { open: openInquiryStores, close: closeInquiryStores },
      ] = useDisclosure(false);
      const [
        inquiryCompaniesOpened,
        { open: openInquiryCompanies, close: closeInquiryCompanies },
      ] = useDisclosure(false);
      const [
        inquiryLocationsOpened,
        { open: openInquiryLocations, close: closeInquiryLocations },
      ] = useDisclosure(false);
      const [isMenuOpen, setMenuOpen] = useState(false);

      const isInquiryRole = role === 'INQUIRY_EMPLOYEE';
      const stringifiedManagedBranches = row.original.inquiryBranches.map(
        (branch) => branch.id.toString()
      );

      const stringifiedLocations = row.original.inquiryLocations.map(
        (location) => location.id.toString()
      );
      const stringifiedStores = row.original.inquiryStores.map((store) =>
        store.id.toString()
      );

      const stringifiedCompanies = row.original.inquiryCompanies.map(
        (company) => company.id.toString()
      );

      return (
        <Menu
          zIndex={150}
          opened={isMenuOpen}
          onChange={() => {
            if (
              deleteOpened ||
              inquiryBranchesOpened ||
              inquiryStatusesOpened ||
              inquiryGovernoratesOpened ||
              inquiryStoresOpened ||
              inquiryCompaniesOpened ||
              inquiryLocationsOpened
            )
              return;
            setMenuOpen(!isMenuOpen);
          }}
        >
          <Menu.Target>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="space-y-2">
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/employees/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/employees/${id}/edit`}
            >
              تعديل
            </Link>
            <DeleteEmployee
              opened={deleteOpened}
              close={closeDelete}
              open={openDelete}
              id={id}
              closeMenu={() => setMenuOpen(false)}
            />
            {isInquiryRole && (
              <>
                <AssignInquiryEmployeeBranches
                  opened={inquiryBranchesOpened}
                  close={closeInquiryBranches}
                  open={openInquiryBranches}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedBranches={stringifiedManagedBranches}
                />
                <AssignInquiryEmployeeLocations
                  opened={inquiryLocationsOpened}
                  close={closeInquiryLocations}
                  open={openInquiryLocations}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedLocations={stringifiedLocations}
                />
                <AssignInquiryEmployeeStores
                  opened={inquiryStoresOpened}
                  close={closeInquiryStores}
                  open={openInquiryStores}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedStores={stringifiedStores}
                />
                <AssignInquiryEmployeeCompanies
                  opened={inquiryCompaniesOpened}
                  close={closeInquiryCompanies}
                  open={openInquiryCompanies}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedCompanies={stringifiedCompanies}
                />
                <AssignInquiryEmployeeGovernorate
                  opened={inquiryGovernoratesOpened}
                  close={closeInquiryGovernorates}
                  open={openInquiryGovernorates}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedGovernorate={row.original.inquiryGovernorates}
                />
                <AssignInquiryEmployeeStatuses
                  opened={inquiryStatusesOpened}
                  close={closeInquiryStatuses}
                  open={openInquiryStatuses}
                  id={id}
                  closeMenu={() => setMenuOpen(false)}
                  managedStatuses={row.original.inquiryStatuses}
                />
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      );
    },
  },
];
