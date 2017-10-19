import React, {Component} from 'react';
import { connect } from 'react-redux';
import {onLoadPage} from '../../actions/movies-action';
import MovieList from '../../components/MovieList/MovieList';

class Main extends Component {
    componentDidMount() {
        this.props.loadUpcomingMovies();
    }
    render() {


        return (
            <main className="main">
                <div className="movies-content">
                    <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList}/>
                    <MovieList movieListTitle={'Сейчас в кино'} movieList={this.props.PlayMovies}/>
                    <MovieList movieListTitle={'Топ фильмы'} movieList={this.props.TopMovies}/>
                    <MovieList movieListTitle={'Популярные фильмы'} movieList={this.props.PopMovies}/>
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
