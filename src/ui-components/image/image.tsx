import React, { useState } from 'react';

import NoImg from '~/assets/images/noImg.png';
import errorImg from '~/assets/images/error.png';
import { imgUrl } from '~/core/config';
import Spinner from '~/ui-components/spinner/Spinner';
import classNames from 'classnames';
import './image.sass';

interface MyProps {
  src?: string | null;
  alt?: string;
  showSpinner?: boolean;
  className?: string;
}

export default function Image (props: MyProps) {
  const [imgStatus, setImgStatus] = useState(true);
  const [imgError, setImgError] = useState(false);
  let imageSrc = NoImg;

  const onLoadImg = () => {
    setImgStatus(false);
  };

  const onErrorImg = () => {
    setImgError(true);
  };

  if (props.src) {
    imageSrc = props.src.match(/^http/) ? props.src : `${imgUrl}${props.src}`;
  }

  if (imgError) {
    imageSrc = errorImg;
  }

  const imgClass = classNames(props.className, { 'img-loading': imgStatus });
  const imgWrapperClass = classNames('image-wrapper', {
    'image-wrapper--preload': imgStatus || imgError,
    'image-wrapper--error': imgError
  });

  const { alt = '' } = props;
  return (
    <div className={imgWrapperClass}>
      {(props.showSpinner && imgStatus && !imgError) && <Spinner />}
      <img
        className={imgClass}
        src={imageSrc}
        alt={alt}
        onError={onErrorImg}
        onLoad={onLoadImg}
      />
    </div>
  );
}
