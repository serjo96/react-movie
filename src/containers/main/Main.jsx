import React, {Component} from 'react';
import { connect } from 'react-redux';
import {onLoadPage} from '../../actions/movies-action';
import MovieList from '../MovieList/MovieList';

class Main extends Component {
    componentDidMount() {
        this.props.loadUpcomingMovies();
    }
    render() {
        return (
            <main className="main">
                <div className="movies-content">
                    <MovieList movieListTitle={'Ожидаемые фильмы'} movieList={this.props.UpcomingList}/>
                    <MovieList movieListTitle={'Топ фильмы'} movieList={this.props.TopMovies}/>
                    <MovieList movieListTitle={'Сейчас в прокате'} movieList={this.props.PlayMovies}/>
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
		TopMovies: state.topMovies,
		PlayMovies: state.PlayingMovies
	};
}


export default connect( mapStateToProps, mapDispatchToProps )(Main);
