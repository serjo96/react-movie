import React, {Component} from 'react';
import { connect } from 'react-redux';
import {onLoadPage} from '../../actions/movies-action';
import MovieList from '../../components/MovieList/MoviesList';

class Main extends Component {
    componentDidMount() {
        this.props.loadUpcomingMovies();
    }
    render() {


        return (
            <main className="main">
                <div className="movies-content">
                    <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList} count={11} movieListMain={true} ListLink={'upcoming'}/>
                    <MovieList movieListTitle={'Сейчас в кино'} movieList={this.props.PlayMovies} count={11} movieListMain={true} ListLink={'playing'}/>
                    <MovieList movieListTitle={'Топ фильмы'} movieList={this.props.TopMovies} count={11} movieListMain={true} ListLink={'top'}/>
                    <MovieList movieListTitle={'Популярные фильмы'} movieList={this.props.PopMovies} count={11} movieListMain={true} ListLink={'popular'}/>
                </div>
            </main>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadUpcomingMovies: () => dispatch(onLoadPage())
});

function mapStateToProps(state) {
    return {
        UpcomingList: state.upcomingMovies,
        TopMovies: state.TopMovies,
        PopMovies: state.PopMovies,
        PlayMovies: state.PlayingMovies
    };
}


export default connect( mapStateToProps, mapDispatchToProps )(Main);
