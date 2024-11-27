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
import { Switcher, Notification, UserAvatar } from '@carbon/icons-react';

import Link from 'next/link';

const CustomHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Cielospeso">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="">Cielospeso</HeaderName>
        </Link>
        <HeaderNavigation aria-label="Cielospeso">
          <Link href="/catalog" passHref legacyBehavior>
            <HeaderMenuItem>Catalog</HeaderMenuItem>
          </Link>
          <Link href="/ai-assistant" passHref legacyBehavior>
            <HeaderMenuItem>AI Assistant</HeaderMenuItem>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <HeaderMenuItem>Login</HeaderMenuItem>
          </Link>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <Link href="/catalog" passHref legacyBehavior>
                <HeaderMenuItem>Catalog</HeaderMenuItem>
              </Link>
            </HeaderSideNavItems>
          </SideNavItems>
          <SideNavItems>
            <HeaderSideNavItems>
              <Link href="/ai-assistant" passHref legacyBehavior>
                <HeaderMenuItem>AI Assistant</HeaderMenuItem>
              </Link>
            </HeaderSideNavItems>
          </SideNavItems>
          <SideNavItems>
            <HeaderSideNavItems>
              <Link href="/login" passHref legacyBehavior>
                <HeaderMenuItem>Login</HeaderMenuItem>
              </Link>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center"
            className="action-icons"
          >
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User Avatar"
            tooltipAlignment="center"
            className="action-icons"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          {/* <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction> */}
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default CustomHeader;
