import React from 'react';
import './spinner.sass';
import classNames from 'classnames';

interface MyProps {
  isFullScreen?: boolean;
}

function Spinner ({ isFullScreen }: MyProps) {
  const spinnerClass = classNames('spinner', {
    'spinner--full-page': isFullScreen
  });

  return (
    <div className='spinner-wrap'>
      <div className={spinnerClass} />
    </div>
  );
}

export default (Spinner);
