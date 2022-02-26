import React, { useState } from 'react';

import NoImg from '~/assets/images/noImg.png';
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
  const imageSrc = props.src ? `${imgUrl}${props.src}` : NoImg;
  const onLoadImg = () => {
    setTimeout(() => setImgStatus(false), 500);
  };
  const imgClass = classNames(props.className, { 'img-loading': imgStatus });

  const { alt = '' } = props;
  return (
    <div className='image-wrapper'>
      {(props.showSpinner && imgStatus) && <Spinner />}
      <img
        className={imgClass}
        src={imageSrc}
        alt={alt}
        onLoad={onLoadImg}
      />
    </div>
  );
}
