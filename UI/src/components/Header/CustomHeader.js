'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Notification, UserAvatar, Logout } from '@carbon/icons-react'; // Import the Logout icon
import { useAuth } from '@/components/AuthContext/AuthProvider';
import Link from 'next/link';

const CustomHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Airu">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <Link href="/" passHref legacyBehavior>
            <HeaderName prefix="">Airu</HeaderName>
          </Link>
          <HeaderNavigation aria-label="Airu">
            {isAuthenticated && (
              <Link href="/catalog" passHref legacyBehavior>
                <HeaderMenuItem>Catalog</HeaderMenuItem>
              </Link>
            )}
            {!isAuthenticated && (
              <Link href="/login" passHref legacyBehavior>
                <HeaderMenuItem>Login</HeaderMenuItem>
              </Link>
            )}
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                {isAuthenticated && (
                  <Link href="/catalog" passHref legacyBehavior>
                    <HeaderMenuItem>Catalog</HeaderMenuItem>
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link href="/login" passHref legacyBehavior>
                    <HeaderMenuItem>Login</HeaderMenuItem>
                  </Link>
                )}
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          {isAuthenticated && (
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Notifications"
                onClick={() => console.log('Notifications')}
              >
                <Notification />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="User Avatar"
                onClick={() => console.log('User Avatar')}
              >
                <UserAvatar />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Logout" onClick={() => logout()}>
                <Logout />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          )}
        </Header>
      )}
    />
  );
};

export default CustomHeader;
