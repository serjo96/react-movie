import React from 'react';

export const LoadEngData = (mediaData) => {
  if (mediaData.overview) {
    return (
      <p className='description__text'>{mediaData.overview}</p>
    );
  }
  return (
    <div>
      <div>Ой! Кажется описание к этому произведению отсутствует</div>
      <div className='load-description-eng'>
        <button onClick={() => mediaData.loadTvData(mediaData.id, mediaData.lang)}>Загрузить описание на английском?</button>
      </div>
    </div>
  );
};
