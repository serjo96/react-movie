import React from 'react';
import './popup.sass';

interface MyProps {
  children: React.ReactNode;
  closePopup: () => void;
  title?: string;
}

export default function Popup ({
  children,
  title,
  closePopup
}: MyProps) {
  return (
    <div className='popup-base' onClick={closePopup}>
      <div className='popup'>
        <div className='popup__close' onClick={closePopup} />
        {title && <h3 className='popup__title'>{title}</h3>}
        <div className='popup__content popup--is-hide'>
          {children}
        </div>
      </div>
    </div>
  );
}
