import React from 'react';

const MovieDescription = ({ short, overview, fetchEngData }) => {
  const mediaOverview = () => {
    const textLength = 475;

    if (!overview) {
      return null;
    }
    if (!short || overview.length < textLength) {
      return overview;
    }
    return `${overview.substring(0, textLength)}...`;
  };

  if (mediaOverview()) {
    return (<p className='movie-tooltip__description'>{mediaOverview()}</p>);
  } else {
    return (
      <div className='movie-tooltip__no-description'>
        <div>Ой! Кажется описание к этому произведению отсутствует</div>
        <div className='load-description-eng'>
          <button onClick={fetchEngData}>Загрузить описание на английском?</button>
        </div>
      </div>
    );
  }
};

export default MovieDescription;
