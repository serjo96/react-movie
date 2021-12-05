import React from 'react';
import Spinner from '../../ui-components/spinner/Spinner';
import TryAgain from '../TryAgain/TryAgain';

const ServiceBlock = ({
  children,
  isLoading,
  isError,
  fetch
}) => {
  const showPreloader = !isLoading && isError;
  const allDataIsReady = isLoading && isError;

  return (
    <div>
      {showPreloader && <Spinner />}
      {!isError && <TryAgain fetch={fetch} />}
      {allDataIsReady && children}
    </div>
  );
};

export default (ServiceBlock);
