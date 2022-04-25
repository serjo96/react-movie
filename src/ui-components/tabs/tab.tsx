import React from 'react';

export interface TabProps {
  tabKey: string;
  className?: string;
  children: React.ReactNode
}

export default function Tab ({
  className,
  children
}: TabProps) {
  return (
    <li
      className={className}
    >
      {children}
    </li>
  );
}
