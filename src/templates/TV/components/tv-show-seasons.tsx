import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Image } from '~/core/types/images';
import MediaItem from '~/ui-components/media-item/media-item';
import { MediaType } from '~/core/types/media-type';
import { TvDetails } from '~/core/types/tvDetails';
import { SeasonRouteMatchParams } from '~/templates/TV/containers/tv-details';

interface MyProps {
  seasons: TvDetails['seasons'];
  images: Image[]
}

function TvShowSeasons ({
  seasons,
  images
}: MyProps) {
  if (!seasons || !seasons.length) {
    return null;
  }
  const isTvShowSeasonsPage = useRouteMatch({
    path: '/tv/:id/season-:season',
    exact: true,
    strict: false
  });
  const { url } = useRouteMatch({
    path: '/tv/:id',
    strict: false
  });

  const randomBackgroundImg = () => {
    if (!images.length) {
      return null;
    }
    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${images[Math.floor(Math.random() * images.length)].filePath})`
    };
  };

  return (

    <div
      className='tv-seasons'
      style={randomBackgroundImg()}
    >
      <div className='bg-base' />
      <div className='tv-seasons__data'>
        <div className='container'>
          <h2 className='tv-seasons__title'>Сезоны</h2>
          <div className='seasons-list'>
            {seasons.map((el, index) =>

              <MediaItem
                title={el.name}
                overview={el.overview}
                date={el.airDate}
                poster={el.posterPath}
                id={el.id}
                key={index}
                linkPath={`${url}/season-${el.seasonNumber}`}
                isNotLink={isTvShowSeasonsPage && +(isTvShowSeasonsPage.params as SeasonRouteMatchParams).season === el.seasonNumber}
                typeList={MediaType.TV}
              />

            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default TvShowSeasons;
