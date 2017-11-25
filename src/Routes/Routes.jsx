import React, {Component} from 'react';
import {  Route, Switch } from 'react-router-dom';
import Main from '../containers/main/Main';
import Movie from '../components/Move/Movie';
import MovieUpcoming from '../components/MovieList/MoviesUpcoming';
import MoviePlaying from '../components/MovieList/MoviesPlaying';
import MoviesTop from '../components/MovieList/MoviesTop';
import MoviesPopular from '../components/MovieList/MoviesPopular';
import TVAiring from '../components/TvLists/TVAiring';
import TvPopular from '../components/TvLists/TvPopular';
import TvTop from '../components/TvLists/TVTop';
import TVonTheAir from '../components/TvLists/TVonTheAir';
import TV from '../components/TV/Tv';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/movies/upcoming" component={MovieUpcoming} />
                <Route exact path="/movies/playing" component={MoviePlaying} />
                <Route exact path="/movies/top" component={MoviesTop} />
                <Route exact path="/movies/popular" component={MoviesPopular} />
                <Route exact path="/movie/:id" component={Movie} />
                <Route exact path="/tv/airing" component={TVAiring} />
                <Route exact path="/tv/popular" component={TvPopular} />
                <Route exact path="/tv/top" component={TvTop} />
                <Route exact path="/tv/onAir" component={TVonTheAir} />
                <Route path="/tv/:id" component={TV} />
            </Switch>
        )
    }
}

export default Routes;
