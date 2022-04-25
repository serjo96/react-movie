import React from 'react';
import './try-again-button.sass';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface MyProps {
  fetch: () => void;
  isFullScreen?: boolean;
}

const TryAgain = ({ fetch, isFullScreen }: MyProps) => {
  const { t } = useTranslation();

  const tryAgainClass = classNames('try-again', {
    'try-again--full-screen': isFullScreen
  });

  return (
    <div className={tryAgainClass}>
      <button onClick={fetch} className='try-again__btn'>{t('service.tryAgain')}</button>
    </div>
  );
};

export default TryAgain;
