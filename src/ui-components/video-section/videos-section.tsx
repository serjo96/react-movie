import React, { useState } from 'react';
import { Videos } from '~/core/types/videos';
import Popup from '~/templates/popup/popup';
import YouTube from 'react-youtube';
import Portal from '~/ui-components/portal/portal';
import './video-section.sass';

interface MyProps {
  videos: Videos;
}

const YouTubeParams = {
  playerVars: {
    autoplay: 0 as 0 | 1
  },
  height: '100%'
};

export function VideosSection ({ videos }: MyProps) {
  const [isShowTrailer, toggleTrailerView] = useState(false);
  const [videoKey, setVideoKey] = useState('');
  if (!videos.results.length) {
    return null;
  }

  const handlerOnShowTrailer = (key: string) => {
    toggleTrailerView(true);
    setVideoKey(key);
  };

  const closeTrailer = () => {
    toggleTrailerView(false);
  };

  return (
    <React.Fragment>
      <section className='trailer'>
        <h2>{videos.results.length > 1 ? 'Трейлеры' : 'Трейлер'}</h2>

        <div className='trailer__list'>
          {videos.results.map((video, indx) => video.site === 'YouTube' &&
            <div className='trailer__preview' id={video.key} key={indx}>
              <div className='preview-base' onClick={() => handlerOnShowTrailer(video.key)}>
                <i className='fa fa-play' aria-hidden='true' />
              </div>
              <img src={`https://i3.ytimg.com/vi/${video.key}/mqdefault.jpg`} alt='' />
            </div>
          )}
        </div>
      </section>
      {isShowTrailer &&
        <Portal>
          <div className='popup popup--video'>
            <Popup className='popup--video' closePopup={closeTrailer}>
              <YouTube
                videoId={videoKey}
                opts={YouTubeParams}
              />
            </Popup>
          </div>
        </Portal>}

    </React.Fragment>
  );
}