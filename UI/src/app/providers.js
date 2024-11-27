'use client';

import { Content, Theme } from '@carbon/react';
import CustomHeader from '@/components/Header/CustomHeader';
import { AuthProvider } from '@/components/AuthContext/AuthProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <Theme theme="g100">
        <CustomHeader />
      </Theme>
      <Content>{children}</Content>
    </AuthProvider>
  );
}
