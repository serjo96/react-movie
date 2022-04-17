import React from 'react';
import './try-again-button.sass';
import { useTranslation } from 'react-i18next';

interface MyProps {
  fetch: () => void;
}

const TryAgain = ({ fetch }: MyProps) => {
  const { t } = useTranslation();
  return (
    <div className='try-again-wrap'>
      <button onClick={fetch} className='try-again-btn'>{t('service.tryAgain')}</button>
    </div>
  );
};

export default TryAgain;
