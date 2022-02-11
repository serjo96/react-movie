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
  const tabsLabels = children.map(el => el.props.title);
  const [activeTab, setActiveTab] = useState(defaultActiveKey || tabsLabels[0]);

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
        {tabsLabels.map(label => (
          <button
            key={label}
            onClick={() => onClickTabItem(label)}
            className={headerTabClass(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='tab-content'>
        {children.map((child) => {
          if (child.props.title !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
