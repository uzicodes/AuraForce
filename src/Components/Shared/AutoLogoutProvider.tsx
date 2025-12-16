'use client';

import { useAutoLogout } from '@/hooks/useAutoLogout';

const AutoLogoutProvider = ({ children }: { children: React.ReactNode }) => {
  // Activate the 30-minute timer
  useAutoLogout(30);

  return <>{children}</>;
};

export default AutoLogoutProvider;