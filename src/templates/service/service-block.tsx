import React from 'react';
import Spinner from '~/ui-components/spinner/Spinner';
import TryAgain from '../try-again-button/try-again-button';

interface MyProps {
  children: React.ReactNode;
  sectionService?: boolean;
  isLoading: boolean;
  isSuccessful: boolean;
  fetch?: () => void;
}

const ServiceBlock = ({
  children,
  isLoading,
  isSuccessful,
  sectionService,
  fetch
}: MyProps) => {
  const showPreloader = isLoading && isSuccessful;
  const allDataIsReady = !isLoading && isSuccessful;

  return (
    <React.Fragment>
      {showPreloader && <Spinner isFullScreen={!sectionService} />}
      {(!isSuccessful && fetch) && <TryAgain isFullScreen={!sectionService} fetch={fetch} />}
      {allDataIsReady && children}
    </React.Fragment>
  );
};

export default ServiceBlock;
