import React, { useState } from 'react';
import Lightbox from 'lightbox-react';
import classNames from 'classnames';

import { Image } from '~/core/types/images';

interface MyProps {
  imgCount: number
  title: string;
  images: Image[];
  posters?: boolean;
}

export default function MediaStills ({
  imgCount,
  title,
  images,
  posters
}: MyProps) {
  const [imgListCount, setImgListCount] = useState(imgCount ? imgCount - 1 : 15);
  const [imgIndex, setImageIndex] = useState(0);
  const [isShowLightBox, setVisibilityLightBox] = useState(false);
  const [isLoadedImages, setIsLoadedImages] = useState(false);

  const loadMoreImg = () => {
    setImgListCount(imgListCount + imgCount);
    setIsLoadedImages(true);
  };

  const onClickImg = (imageIndex: number) => {
    setImageIndex(imageIndex);
    setVisibilityLightBox(true);
  };

  const stillsListClass = classNames('stills__list', {
    'stills__list--moreLoaded': images.length <= imgCount + 1 || isLoadedImages,
    'stills__list--person': title === 'Фото'
  });

  if (!images.length) {
    return null;
  }
  return (
    <React.Fragment>
      <div className='stills'>
        <h2>{title}</h2>
        <div className={stillsListClass}>
          {images.length > imgListCount + 1 &&
            <div className='show-more show-more--stills'>
              <div className='show-more__btn' onClick={loadMoreImg}>Больше</div>
            </div>}
          {images.map((backdrop, indx) => indx <= imgListCount &&
            <div
              className={`stills__img ${posters && 'stills__img--posters'}`}
              key={indx}
            >
              <img
                src={'https://image.tmdb.org/t/p/w1280' + backdrop.filePath}
                data-index={indx}
                alt=''
                onClick={() => onClickImg(indx)}
              />
            </div>
          )}
        </div>
      </div>

      {isShowLightBox &&
        <Lightbox
          mainSrc={'https://image.tmdb.org/t/p/w1280' + images[imgIndex].filePath}
          nextSrc={'https://image.tmdb.org/t/p/w1280' + images[(imgIndex + 1) % images.length].filePath}
          prevSrc={'https://image.tmdb.org/t/p/w1280' + images[(imgIndex + images.length - 1) % images.length].filePath}

          onCloseRequest={() => setVisibilityLightBox(false)}
          onMovePrevRequest={() => this.setState({
            imgIndex: (imgIndex + images.length - 1) % images.length
          })}
          onMoveNextRequest={() => this.setState({
            imgIndex: (imgIndex + 1) % images.length
          })}
        />}
    </React.Fragment>

  );
}
