import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import Main from '~/templates/main/main';
import MovieDetails from '~/templates/Movie/containers/movie-details';
import MovieUpcoming from '~/templates/moviesList/container/movies-upcoming';
import MoviePlaying from '~/templates/moviesList/container/movies-playing';
import MoviesAll from '~/templates/moviesList/container/movies-all';

import TvShowsAll from '~/templates/TvLists/tv-shows-all';
import TvOnTheAir from '~/templates/TvLists/tv-on-the-air';
import TvAiring from '~/templates/TvLists/tv-airing';
import TvShowsTop from '~/templates/TvLists/tv-shows-top';
import TvDetails from '~/templates/TV/containers/tv-details';

import People from '~/templates/Person/person';
import Company from '~/templates/company/company-page';
import KeywordsPage from '~/templates/keywords/keywords-page';
import SearchPage from '~/templates/Search/search-page';

export const routesList: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Main
  },
  {
    path: '/keywords-movies/:id',
    exact: false,
    component: KeywordsPage
  },
  {
    path: '/keywords-tv-shows/:id',
    exact: false,
    component: KeywordsPage
  },
  {
    path: '/tv/airing',
    exact: true,
    component: TvAiring
  },
  {
    path: '/tv/onAir',
    exact: true,
    component: TvOnTheAir
  },
  {
    path: '/tv/top',
    exact: true,
    component: TvShowsTop
  },
  {
    path: '/tv/all',
    exact: false,
    component: TvShowsAll
  },
  {
    path: '/tv/:id',
    exact: true,
    component: TvDetails
  },
  {
    path: '/tv/:id/season-:season',
    exact: true,
    component: TvDetails
  },
  {
    path: '/movies/all',
    exact: false,
    component: MoviesAll
  },
  {
    path: '/movies/upcoming',
    exact: true,
    component: MovieUpcoming
  },
  {
    path: '/movies/playing',
    exact: true,
    component: MoviePlaying
  },
  {
    path: '/movie/:id',
    exact: true,
    component: MovieDetails
  },
  {
    path: '/person/:id',
    exact: true,
    component: People
  },
  {
    path: '/company/:id',
    exact: true,
    component: Company
  },
  {
    path: '/search',
    exact: false,
    component: SearchPage
  }
];

const SentryRoute = Sentry.withSentryRouting(Route);

function Routes () {
  return (

    <Switch>
      {routesList.map(router => (
        <SentryRoute
          key={router.path as string}
          path={router.path}
          exact={router.exact}
          component={router.component}
        />
      ))}
    </Switch>
  );
}

export default Routes;
