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
                <div className="movies-list-content">
                    <MovieList movieListTitle={'ожидаемые фильмы'} movieList={this.props.UpcomingList}/>
                    <MovieList movieListTitle={'топ фильмы'} movieList={this.props.TopMovies}/>
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
		TopMovies: state.topMovies
	};
}


export default connect( mapStateToProps, mapDispatchToProps )(Main);
