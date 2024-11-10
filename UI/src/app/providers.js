'use client';

import { Content, Theme } from '@carbon/react';

import CustomHeader from '@/components/Header/CustomHeader';

export function Providers({ children }) {
  return (
    <div>
      <Theme theme="g100">
        <CustomHeader />
      </Theme>
      <Content>{children}</Content>
    </div>
  );
}
