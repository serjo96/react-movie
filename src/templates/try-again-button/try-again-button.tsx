import React from 'react';
import './try-again-button.sass';

interface MyProps {
  fetch: () => void;
}

const TryAgain = ({ fetch }: MyProps) => (
  <div className='try-again-wrap'>
    <button onClick={fetch} className='try-again-btn'>Произошла ошибка, попробовать повторить запрос?</button>
  </div>
);

export default TryAgain;
