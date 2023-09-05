import { type FC } from 'react';

import { useAppSelector, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type BurgerMenuItem, type TabName } from '~/libs/types/types.js';
import { Sidebar } from '~/pages/dashboard/components/sidebar/sidebar.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { Header } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  isHeaderHidden?: boolean;
  isSidebarHidden?: boolean;
  menuItems?: BurgerMenuItem[];
  children: JSX.Element;
};

const PageLayout: FC<Properties> = ({
  isHeaderHidden = false,
  isSidebarHidden = false,
  children,
  menuItems,
}: Properties) => {
  const [selectedTab, setSelectedTab] = useState<TabName>('orders');
  const user = useAppSelector(selectUser);
  const hasUser = Boolean(user);

  const handleTabSelect = useCallback(
    (tabName: TabName) => setSelectedTab(tabName),
    [],
  );

  return (
    <div className={styles.container}>
      {!isHeaderHidden && (
        <div className={styles.header}>
          <Header isAuth={hasUser} menuItems={menuItems} />
        </div>
      )}
      {!isSidebarHidden && (
        <div className={styles.sidebar}>
          <Sidebar selectedTab={selectedTab} onTabClick={handleTabSelect} />
        </div>
      )}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export { PageLayout };
