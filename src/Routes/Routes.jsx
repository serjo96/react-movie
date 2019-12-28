import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Templates/main/Main';
import Movie from '../Templates/Movie/containers/Movie';
import MovieUpcoming from '../Templates/MoviesList/container/MoviesUpcoming';
import MoviePlaying from '../Templates/MoviesList/container/MoviesPlaying';
import MoviesAll from '../Templates/MoviesList/container/MoviesAll';
import TVAiring from '../Templates/TvLists/TVAiring';
import TvPopular from '../Templates/TvLists/TVall';
import TVonTheAir from '../Templates/TvLists/TVonTheAir';
import TV from '../Templates/TV/containers/Tv';
import People from '../Templates/Person/containers/Person';
import Search from '../Templates/Search/Search';
import Company from '../Templates/Company/Company';

import KeywordsList from '../Templates/Lists/KeywordsList';

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
