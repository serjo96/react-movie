import React, { useState } from 'react';
import Lightbox from 'lightbox-react';
import classNames from 'classnames';
import './media-stills.sass';

import { Image as ImgInterface } from '~/core/types/images';
import { useTranslation } from 'react-i18next';

import Image from '~/ui-components/image/image';

export enum stillsType {
  PERSON = 'person',
  POSTERS = 'posters',
  STILLS = 'stills'
}

interface MyProps {
  imgCount: number
  title: string;
  images: ImgInterface[];
  posters?: boolean;
  stillsVariants?: stillsType
}

const defaultCount = 15;

export default function MediaStills ({
  imgCount = defaultCount,
  title,
  images,
  posters,
  stillsVariants
}: MyProps) {
  const [imgListCount, setImgListCount] = useState(imgCount - 1);
  const [imgIndex, setImageIndex] = useState(0);
  const [isShowLightBox, setVisibilityLightBox] = useState(false);
  const [isLoadedImages, setIsLoadedImages] = useState(false);
  const { t } = useTranslation();

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
    'stills__list--poster': stillsVariants === stillsType.PERSON || stillsVariants === stillsType.POSTERS
  });

  const stillsImgClasses = classNames('stills__img', {
    'stills__img--posters': posters
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
              <button
                className='show-more__btn'
                onClick={loadMoreImg}
              >
                {t('moreButton')}
              </button>
            </div>}
          {images.map((backdrop, indx) => indx <= imgListCount &&
            <div
              className={stillsImgClasses}
              key={indx}
            >
              <Image
                src={'https://image.tmdb.org/t/p/w1280' + backdrop.filePath}
                alt=''
                showSpinner
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
          onMovePrevRequest={() => setImageIndex((imgIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setImageIndex((imgIndex + 1) % images.length)}
        />}
    </React.Fragment>

  );
}
