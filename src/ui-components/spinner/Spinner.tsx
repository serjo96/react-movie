import React from 'react';
import './spinner.sass';
import classNames from 'classnames';

interface MyProps {
  isFullScreen?: boolean;
}

function Spinner ({ isFullScreen }: MyProps) {
  const spinnerWrapClass = classNames('spinner-wrap', {
    'spinner-wrap--full-page': isFullScreen
  });
  const spinnerClass = classNames('spinner', {
    'spinner--full-page': isFullScreen
  });

  return (
    <div className={spinnerWrapClass}>
      <div className={spinnerClass} />
    </div>
  );
}

export default (Spinner);
