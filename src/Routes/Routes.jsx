import React, {Component} from 'react';
import {  Route, Switch } from 'react-router-dom';
import Main from '../containers/main/Main';
import Movie from '../containers/Movie/Movie';
import MovieUpcoming from '../containers/MovieList/MoviesUpcoming';
import MoviePlaying from '../containers/MovieList/MoviesPlaying';
import MoviesPopular from '../containers/MovieList/MoviesAll';
import TVAiring from '../containers/TvLists/TVAiring';
import TvPopular from '../containers/TvLists/TVall';
import TVonTheAir from '../containers/TvLists/TVonTheAir';
import TV from '../containers/TV/Tv';
import People from '../containers/Person/Person';
import Search from '../containers/search/Search';
import Company from '../containers/Company/Company';

import KeywordsList from '../containers/Lists/KeywordsList';



class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/movies/upcoming" component={MovieUpcoming} />
                <Route exact path="/movies/playing" component={MoviePlaying} />
                <Route exact path="/movie/:id" component={Movie} />
                <Route exact path="/tv/airing" component={TVAiring} />
                <Route path="/tv/all" component={TvPopular} />
                <Route exact path="/tv/onAir" component={TVonTheAir} />
                <Route exact path="/person/:id" component={People} />
                <Route exact path="/company/:id" component={Company} />
                <Route path="/tv/:id" component={TV} />
                <Route path="/search" component={Search} />
                <Route path="/movies/all" component={MoviesPopular} />
                <Route path="/lists/keywords_movie/:id" component={KeywordsList} />
                <Route path="/lists/keywords_tv/:id" component={KeywordsList} />
            </Switch>
        )
    }
}

export default Routes;
