import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '~/templates/main/main';
import Movie from '~/templates/Movie/containers/movie';
import MovieUpcoming from '~/templates/moviesList/container/movies-upcoming';
import MoviePlaying from '~/templates/moviesList/container/movies-playing';
import MoviesAll from '~/templates/moviesList/container/movies-all';
import TVAiring from '~/templates/TvLists/TVAiring.jsx';
import TvPopular from '~/templates/TvLists/TVall.jsx';
import TVonTheAir from '~/templates/TvLists/TVonTheAir.jsx';
import TV from '~/templates/TV/containers/Tv.jsx';
import People from '~/templates/Person/containers/Person.jsx';
import Search from '~/templates/Search/Search.jsx';
import Company from '~/templates/Company/Company';

import KeywordsList from '../templates/Lists/keywordsList';

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/movies/upcoming' component={MovieUpcoming} />
        <Route exact path='/movies/playing' component={MoviePlaying} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/tv/airing' component={TVAiring} />
        <Route path='/tv/all' component={TvPopular} />
        <Route exact path='/tv/onAir' component={TVonTheAir} />
        <Route exact path='/person/:id' component={People} />
        <Route exact path='/company/:id' component={Company} />
        <Route path='/tv/:id' component={TV} />
        <Route path='/search' component={Search} />
        <Route path='/movies/all' component={MoviesAll} />
        <Route path='/lists/keywords_movie/:id' component={KeywordsList} />
        <Route path='/lists/keywords_tv/:id' component={KeywordsList} />
      </Switch>
    );
  }
}

export default Routes;
