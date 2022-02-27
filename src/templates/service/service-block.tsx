import React from 'react';
import Spinner from '~/ui-components/spinner/Spinner';
import TryAgain from '../try-again-button/try-again-button';

interface MyProps {
  children: React.ReactNode;
  isLoading: boolean;
  isSuccessful: boolean;
  fetch: () => void;
}

const ServiceBlock = ({
  children,
  isLoading,
  isSuccessful,
  fetch
}: MyProps) => {
  const showPreloader = isLoading && isSuccessful;
  const allDataIsReady = !isLoading && isSuccessful;

  return (
    <React.Fragment>
      {showPreloader && <Spinner isFullScreen />}
      {!isSuccessful && <TryAgain fetch={fetch} />}
      {allDataIsReady && children}
    </React.Fragment>
  );
};

export default ServiceBlock;
