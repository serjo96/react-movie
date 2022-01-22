import React from 'react';
import Spinner from '~/ui-components/spinner/Spinner';
import TryAgain from '../TryAgain/TryAgain';

interface MyProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  fetch: () => void;
}

const ServiceBlock = ({
  children,
  isLoading,
  isError,
  fetch
}: MyProps) => {
  const showPreloader = isLoading && !isError;
  const allDataIsReady = !isLoading && !isError;

  return (
    <React.Fragment>
      {showPreloader && <Spinner />}
      {isError && <TryAgain fetch={fetch} />}
      {allDataIsReady && children}
    </React.Fragment>
  );
};

export default (ServiceBlock);
