import React, {Component} from 'react';
import {  Route, Switch } from 'react-router-dom';
import Main from '../containers/main/Main';
import Movie from '../containers/Movie/Movie';
import MovieUpcoming from '../containers/MovieList/MoviesUpcoming';
import MoviePlaying from '../containers/MovieList/MoviesPlaying';
import MoviesTop from '../containers/MovieList/MoviesTop';
import MoviesPopular from '../containers/MovieList/MoviesPopular';
import TVAiring from '../containers/TvLists/TVAiring';
import TvPopular from '../containers/TvLists/TvPopular';
import TvTop from '../containers/TvLists/TVTop';
import TVonTheAir from '../containers/TvLists/TVonTheAir';
import TV from '../containers/TV/Tv';
import People from '../containers/Person/Person';
import Search from '../containers/search/Search';
import GenresList from '../containers/Lists/GenresList';
import KeywordsList from '../containers/Lists/KeywordsList';
import ListsPage from '../components/MediaList/ListsPage';


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
                <Route exact path="/person/:id" component={People} />
                <Route path="/tv/:id" component={TV} />
                <Route path="/search" component={Search} />
                <Route path="/lists/genres_movie/:id" component={GenresList} />
                <Route path="/lists/genres_tv/:id" component={GenresList} />
                <Route path="/lists/keywords_movie/:id" component={KeywordsList} />
                <Route path="/lists/keywords_tv/:id" component={KeywordsList} />
            </Switch>
        )
    }
}

export default Routes;
