import React from 'react';
import './popup.sass';
import classNames from 'classnames';

interface MyProps {
  children: React.ReactNode;
  closePopup: () => void;
  title?: string;
  className?: string;
}

// TODO: add portal with new layout for popup;
export default function Popup ({
  children,
  title,
  closePopup,
  className
}: MyProps) {
  const popupClass = classNames('popup', { className });
  return (
    <div className='popup-wrapper'>
      <div className='popup-base' onClick={closePopup} />
      <div className={popupClass}>
        <div className='popup__close' onClick={closePopup} />
        {title && <h3 className='popup__title'>{title}</h3>}
        <div className='popup__content popup--is-hide'>
          {children}
        </div>
      </div>
    </div>
  );
}
