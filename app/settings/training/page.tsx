'use client';

import Training from '@/components/agent/training';
import { SidebarPage } from '@/components/layout/SidebarPage';
import { useUser } from '@/components/idiot/useUser';
export default function TrainingPage() {
  const { data: user, isLoading } = useUser();

  // Get role_id from the primary company or the first company if no primary is set
  const userRoleId = user?.companies?.find((company: any) => company.primary)?.role_id ?? user?.companies?.[0]?.role_id;

  const isAdmin = !isLoading && userRoleId && userRoleId < 3;

  return (
    <SidebarPage title='Training'>
      <Training />
    </SidebarPage>
  );
}
