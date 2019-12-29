import React from 'react';

const MovieDescription = ({ short, engData, overview, fetchEngData, id, typeItem }) => {
  const mediaOverview = () => {
    const textLength = 475;

    if (!short || overview.length < textLength) {
      return overview;
    }
    if (!overview) {
      return null;
    }
    return `${overview.substring(0, textLength)}...`;
  };

  if (mediaOverview() && mediaOverview() !== 404) {
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
