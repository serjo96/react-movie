import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '~/templates/main/main';
import Movie from '~/templates/Movie/containers/movie';
import MovieUpcoming from '~/templates/moviesList/container/movies-upcoming';
import MoviePlaying from '~/templates/moviesList/container/movies-playing';
import MoviesAll from '~/templates/moviesList/container/movies-all';

import TvShowsAll from '~/templates/TvLists/tv-shows-all';
import TvOnTheAir from '~/templates/TvLists/tv-on-the-air';
import TvAiring from '~/templates/TvLists/tv-airing';
import TvShowsTop from '~/templates/TvLists/tv-shows-top';
import TvDetails from '~/templates/TV/containers/tv-details';

import People from '~/templates/Person/containers/Person.jsx';
import Search from '~/templates/Search/Search.jsx';
import Company from '~/templates/Company/Company';
import KeywordsPage from '~/templates/keywords/keywords-page';

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/movies/upcoming' component={MovieUpcoming} />
        <Route exact path='/movies/playing' component={MoviePlaying} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/tv/airing' component={TvAiring} />
        <Route path='/tv/all' component={TvShowsAll} />
        <Route exact path='/tv/onAir' component={TvOnTheAir} />
        <Route exact path='/tv/top' component={TvShowsTop} />
        <Route exact path='/person/:id' component={People} />
        <Route exact path='/company/:id' component={Company} />
        <Route path='/tv/:id' component={TvDetails} />
        <Route path='/search' component={Search} />
        <Route path='/movies/all' component={MoviesAll} />
        <Route path='/keywords-movies/:id' component={KeywordsPage} />
        <Route path='/keywords-tv-shows/:id' component={KeywordsPage} />
      </Switch>
    );
  }
}

export default Routes;
