import React, {Component} from 'react';
import { connect } from 'react-redux';
import {onLoadPage} from '../../actions/movies-actions';
import MovieList from '../../components/MediaList/MediaList';
import Spinner from '../../components/Spinner/Spinner';


class Main extends Component {
    componentDidMount() {
        this.props.loadUpcomingMovies();
    }
    render() {

        if(this.props.UpcomingList.isFetching && this.props.TopMovies.isFetching && this.props.AllMovies.isFetching && this.props.PlayMovies.isFetching){
            return (
                <main className="main main--media-list iphonex">
                    <div className="movies-content movies-content--main-page">
                        <MovieList movieListTitle={'Сейчас в кино'} movieList={this.props.PlayMovies} count={11} movieListMain={true} ListLink={'playing'} typeList='movie'/>
                        <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList} count={11} movieListMain={true} ListLink={'upcoming'} typeList='movie'/>
                        <MovieList movieListTitle={'Топ фильмы'} movieList={this.props.TopMovies} count={11} movieListMain={false} ListLink={'top'} typeList='movie'/>
                        <MovieList movieListTitle={'Все фильмы'} movieList={this.props.AllMovies} count={11} movieListMain={true} ListLink={'all'} typeList='movie'/>
                    </div>
                </main>
            );
        }else {
            return (<Spinner/>);
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
        AllMovies: state.Movies.AllMovies,
        PlayMovies: state.Movies.PlayingMovies
    };
}


export default connect( mapStateToProps, mapDispatchToProps )(Main);
