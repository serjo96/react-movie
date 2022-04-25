import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import YouTube from 'react-youtube';

import { Videos } from '~/core/types/videos';
import Popup from '~/templates/popup/popup';
import Portal from '~/ui-components/portal/portal';
import './video-section.sass';

interface MyProps {
  videos: Videos;
  itemsCount?: number;
}

const YouTubeParams = {
  playerVars: {
    autoplay: 0 as 0 | 1
  },
  height: '100%'
};

const defaultCount = 15;

export function VideosSection ({ videos, itemsCount = defaultCount }: MyProps) {
  const { t } = useTranslation(['common', 'mediaCommon']);
  const [videoListCount, setVideoListCount] = useState(itemsCount - 1);
  const [isLoadedVideos, setIsLoadedVideos] = useState(false);
  const [isShowTrailer, toggleTrailerView] = useState(false);
  const [videoKey, setVideoKey] = useState('');

  if (!videos.results.length) {
    return null;
  }

  const loadMoreImg = () => {
    setVideoListCount(videoListCount + itemsCount);
    setIsLoadedVideos(true);
  };

  const handlerOnShowTrailer = (key: string) => {
    toggleTrailerView(true);
    setVideoKey(key);
  };

  const closeTrailer = () => {
    toggleTrailerView(false);
  };

  const videosData = videos.results.filter(video => video.site === 'YouTube');
  const videosListClass = classNames('trailer__list', {
    'trailer__list--moreLoaded': videosData.length <= videoListCount + 1 || isLoadedVideos
  });

  return (
    <React.Fragment>
      <section className='trailer'>
        <h2>{t('mediaCommon:videos.trailer', { count: videos.results.length })}</h2>

        <div className={videosListClass}>
          {videosData.length > videoListCount + 1 &&
            <div className='show-more show-more--stills'>
              <button
                className='show-more__btn'
                onClick={loadMoreImg}
              >
                {t('common:moreButton')}
              </button>
            </div>}
          {videosData.map((video, indx) => indx <= videoListCount && (
            <div className='trailer__preview' id={video.key} key={indx}>
              <div className='preview-base' onClick={() => handlerOnShowTrailer(video.key)}>
                <i className='fa fa-play' aria-hidden='true' />
              </div>
              <img src={`https://i3.ytimg.com/vi/${video.key}/mqdefault.jpg`} alt='' />
            </div>
          ))}
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
