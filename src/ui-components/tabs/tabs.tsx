import React, { useState } from 'react';
import classNames from 'classnames';
import { TabProps } from '~/ui-components/tabs/tab';
import './tabs.sass';

interface MyProps {
  labels?: string[];
  children: React.ReactElement<TabProps>[];
  defaultActiveKey?: string | number;
  onSelect?: (eventKey: string | number) => void;
}

export default function Tabs ({
  labels,
  children,
  defaultActiveKey,
  onSelect
}: MyProps) {
  const getKeys = children.map(el => el.props.tabKey);
  const getTabsLabels = () => {
    if (labels && labels.length) {
      return labels.map((label, index) => {
        return {
          label,
          key: getKeys[index] || label
        };
      });
    }
    return children.map(tabKey => ({
      label: tabKey.props.tabKey,
      key: tabKey.props.tabKey
    }));
  };
  const tabsLabels = getTabsLabels();
  const [activeTab, setActiveTab] = useState(defaultActiveKey || tabsLabels[0].key);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
    onSelect && onSelect(tab);
  };

  const headerTabClass = (label: string) => classNames('tabs-nav__item', {
    'tabs-nav__item--active': activeTab === label
  });

  return (
    <div className='tabs'>
      <div className='tabs-nav'>
        {tabsLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onClickTabItem(key)}
            className={headerTabClass(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='tab-content'>
        {children.map((child) => {
          if (child.props.tabKey !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
