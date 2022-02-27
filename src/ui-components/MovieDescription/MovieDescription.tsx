import React from 'react';
import './media-description.sass';

interface MyProps {
  short?: boolean;
  overview: string;
  fetchEngData?: () => void;
}

const MovieDescription = ({ short, overview, fetchEngData }: MyProps) => {
  const mediaOverview = () => {
    const textLength = 375;

    if (!overview) {
      return null;
    }
    if (!short || overview.length < textLength) {
      return overview;
    }
    return `${overview.substring(0, textLength)}...`;
  };

  if (mediaOverview() || !fetchEngData) {
    return (<p className='media-description'>{mediaOverview()}</p>);
  } else {
    return (
      <div className='media-description__no-description'>
        <div>Ой! Кажется описание отсутствует</div>
        <div className='load-eng-description'>
          <button onClick={fetchEngData}>Загрузить описание на английском?</button>
        </div>
      </div>
    );
  }
};

export default MovieDescription;
