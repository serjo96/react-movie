import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Templates/main/Main.jsx';
import Movie from '../Templates/Movie/containers/Movie.jsx';
import MovieUpcoming from '../Templates/MoviesList/container/MoviesUpcoming.jsx';
import MoviePlaying from '../Templates/MoviesList/container/MoviesPlaying.jsx';
import MoviesAll from '../Templates/MoviesList/container/MoviesAll.jsx';
import TVAiring from '../Templates/TvLists/TVAiring.jsx';
import TvPopular from '../Templates/TvLists/TVall.jsx';
import TVonTheAir from '../Templates/TvLists/TVonTheAir.jsx';
import TV from '../Templates/TV/containers/Tv.jsx';
import People from '../Templates/Person/containers/Person.jsx';
import Search from '../Templates/Search/Search.jsx';
import Company from '../Templates/Company/Company.jsx';

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
