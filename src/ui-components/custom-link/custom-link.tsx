import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface MyProps {
  className?: string;
  isNotLink?: boolean;
  children: React.ReactNode;
  to: LinkProps['to'];
}

const CustomLink = ({ className, isNotLink, children, to, ...rest }: MyProps) => {
  if (isNotLink) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link
      to={to}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
