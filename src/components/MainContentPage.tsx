import * as React from 'react';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import Iframe from 'react-iframe';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Tab,
  Tabs,
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import {
  setActiveKeyIndexValue,
  setTabsValue,
} from '../reducer/SidebarFormReducer';
import { filter } from 'lodash';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';

export function MainContentPage() {
  const {
    sidebarFormState: { tabs: currentTabs, activeTabKey },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();

  const tabComponentRef = React.useRef<any>();
  const firstMount = React.useRef(true);

  const onClose = (event: any, tabIndex: string | number) => {
    const tabIndexNum = tabIndex as number;
    let nextTabIndex = activeTabKey;
    if (tabIndexNum < activeTabKey) {
      // if a preceding tab is closing, keep focus on the new index of the current tab
      nextTabIndex = activeTabKey - 1 > 0 ? activeTabKey - 1 : 0;
    } else if (activeTabKey === currentTabs.length - 1) {
      // if the closing tab is the last tab, focus the preceding tab
      nextTabIndex = currentTabs.length - 2 > 0 ? currentTabs.length - 2 : 0;
    }
    setTabsValue(
      dispatch,
      filter(currentTabs, (tab, index) => index !== tabIndex),
    );
    setActiveKeyIndexValue(dispatch, nextTabIndex || 0);
  };

  React.useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    } else {
      const first =
        tabComponentRef.current.tabList.current.childNodes[activeTabKey];
      first && first.firstChild.focus();
    }
  }, [currentTabs]);
  const renderEmptyMessage = () => {
    return (
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h4" size="lg">
          No Record to show
        </Title>
        <EmptyStateBody>No Record to show</EmptyStateBody>
      </EmptyState>
    );
  };
  return (
    <>
      {currentTabs?.length === 0 ? (
        renderEmptyMessage()
      ) : (
        <Tabs
          activeKey={activeTabKey}
          onClose={onClose}
          aria-label="Tabs in the addable/closeable example"
          addButtonAriaLabel="Add new tab"
          role="region"
          ref={tabComponentRef}
        >
          {currentTabs?.map((tab, index) => (
            <Tab
              key={index}
              eventKey={index}
              aria-label={`Dynamic ${tab}`}
              title={<TabTitleText>{tab?.metadata?.name}</TabTitleText>}
              closeButtonAriaLabel={`Close ${tab?.metadata?.name}`}
              // isCloseDisabled={tabs.length === 1}
            >
              <Iframe
                url={tab?.spec?.url}
                id={tab?.spec?.url}
                className=""
                display="block"
                position="relative"
                styles={{ height: '100%', width: '100%' }}
              />
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
}
