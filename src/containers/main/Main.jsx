import React, {Component} from 'react';
import { connect } from 'react-redux';
import {onLoadPage} from '../../actions/movies-actions';
import MovieList from '../../components/MediaList/MediaList';
import Spinner from '../../components/Spinner/Spinner';
import {Helmet} from 'react-helmet';

class Main extends Component {
    componentDidMount() {
        this.props.loadUpcomingMovies();
    }
    render() {

        if(this.props.UpcomingList.isFetching && this.props.TopMovies.isFetching && this.props.PopMovies.isFetching && this.props.PlayMovies.isFetching){
            return (
                <main className="main main--media-list">
	                <Helmet>
		                <title>Movie Base</title>
	                </Helmet>
                    <div className="movies-content">
                        <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList} count={11} movieListMain={true} ListLink={'upcoming'} typeList='movie'/>
                        <MovieList movieListTitle={'Сейчас в кино'} movieList={this.props.PlayMovies} count={11} movieListMain={true} ListLink={'playing'} typeList='movie'/>
                        <MovieList movieListTitle={'Топ фильмы'} movieList={this.props.TopMovies} count={11} movieListMain={true} ListLink={'top'} typeList='movie'/>
                        <MovieList movieListTitle={'Популярные фильмы'} movieList={this.props.PopMovies} count={11} movieListMain={true} ListLink={'popular'} typeList='movie'/>
                    </div>
                </main>
            );
        }else {
            return (<Spinner/>)
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadUpcomingMovies: () => dispatch(onLoadPage())
});

function mapStateToProps(state) {
    return {
        UpcomingList: state.Movies.upcomingMovies,
        TopMovies: state.Movies.TopMovies,
        PopMovies: state.Movies.PopMovies,
        PlayMovies: state.Movies.PlayingMovies
    };
}


export default connect( mapStateToProps, mapDispatchToProps )(Main);
