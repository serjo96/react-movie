import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { urlRusLat } from '~/utils/format';
import { MediaType } from '~/core/types/media-type';
import { useAppSelector } from '~/hooks/storeHooks';
import classNames from 'classnames';
import './tooltip-info.sass';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';

interface MyProps {
  title: string;
  originalTitle: string;
  overview?: string;
  itemType: MediaType | string;
  voteAverage?: number;
  date?: string;
  genres?: number[];
  handlerHover?: (isHovered: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

function TooltipInfo ({
  title,
  originalTitle,
  overview,
  itemType,
  voteAverage,
  date,
  genres,
  handlerHover,
  className,
  children
}: MyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [toolTipLeft, setToolTipLeft] = useState(true);
  const { active } = useBreakpoints();
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const { genresHash } = useAppSelector(state => state.genres.data);
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];

  const initTooltipPosition = () => {
    if (!isVisible) {
      return;
    }
    const container = containerRef.current;
    const tooltipPadding = 30;
    const parentCoords = container.getBoundingClientRect();
    const tooltipElem = tooltipRef.current;
    let left = container.offsetLeft + container.offsetWidth;
    const top = container.offsetTop + 50;

    if (left < 0) {
      left = 0;
    }
    const containerSizeWithTooltip = window.innerWidth - tooltipPadding - container.offsetWidth - tooltipElem.offsetWidth;
    console.log(parentCoords.left);
    console.log(containerSizeWithTooltip);
    if (parentCoords.left > containerSizeWithTooltip) {
      left = container.offsetLeft - tooltipElem.offsetWidth;
      setToolTipLeft(false);
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
  };

  useEffect(initTooltipPosition, [isVisible]);

  const handleEnterItem = () => {
    if (itemType === MediaType.PERSON) {
      return;
    }
    if (handlerHover) {
      handlerHover(true);
    }
    setIsVisible(true);
  };

  const handleLeaveItem = () => {
    if (handlerHover) {
      handlerHover(false);
    }
    setIsVisible(false);
  };

  const getMovieDate = () => {
    if (!date) {
      return null;
    }
    return <div className='tooltip-info__date'>{date.substring(0, 4)}</div>;
  };

  const genreLink = (genreID: number) => {
    return `/${itemType === MediaType.MOVIE
      ? MediaType.MOVIE + 's'
      : itemType}/all?genre-${urlRusLat(genresHash[genreID])}-${genreID}`;
  };

  const renderGenres = (id: number, index: number) => {
    if (index >= 2 && genresHash[id]) {
      return null;
    }
    return (
      <div key={id} className='genre'>
        <Link
          className='tag'
          to={genreLink(id)}
        >
          {genresHash[id]}
        </Link>
      </div>
    );
  };

  const tooltipClass = classNames('tooltip-info tooltip tooltip--movie', {
    'tooltip-info--is-visible': isVisible,
    'tooltip-info--left': toolTipLeft,
    'tooltip-info--right': !toolTipLeft
  });

  if (mobileBreakpoints.includes(active)) {
    return <div className={className}>{children}</div>;
  }
  return (
    <div
      className={className}
      onMouseEnter={handleEnterItem}
      onMouseLeave={handleLeaveItem}
      ref={containerRef}
    >
      <Fragment>
        {children}
      </Fragment>

      {isVisible &&
        <div
          className={tooltipClass}
          onMouseEnter={handleEnterItem}
          onMouseLeave={handleLeaveItem}
          ref={tooltipRef}
        >
          <div className='tooltip-info__content'>
            <div className='tooltip-info__title'>
              <div className='ru-title'>{title}</div>
              <div className='original-title'>{originalTitle !== title && originalTitle}</div>
            </div>
            <div className='tooltip-info__attributes'>
              <div className='tooltip-info__genre-data'>
                {getMovieDate()}

                {genres &&
                  <div className='genres'>
                    {genres.map((id, index) => renderGenres(id, index))}
                  </div>}

              </div>
              {voteAverage && <div className='rating'>Рейтинг {voteAverage} из 10</div>}
            </div>
            <MovieDescription
              short
              overview={overview}
            />
          </div>
        </div>}
    </div>
  );
}

export default TooltipInfo;
