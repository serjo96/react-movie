import React, {Component} from 'react';
import { moviePlaying } from '../../actions/movies-action';
import { connect } from 'react-redux';
import MovieList from './MoviesList';


class MoviePlaying extends Component {
	componentDidMount() {
		this.sendRequest();
	}

	sendRequest = () =>{
		this.props.loadPlaying();
	};

	render() {
		return (
			<main className="main">
				<div className="movies-content">
					<MovieList movieListTitle={'Сейчас в кино'} movieList={this.props.PlayMovies}/>
					<div className="pager-btns">
						<div className="pager-btn pager-btn--prev link-angle"><i className="fa fa-angle-left" aria-hidden="true" /><span>Следующая страница</span></div>
						<div className="pager-btn pager-btn--next link-angle"><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div>
					</div>
				</div>
			</main>
		);

	}
}

function mapStateToProps(state) {
	return {
		PlayMovies: state.PlayingMovies
	};
}

const mapDispatchToProps = (dispatch) => ({
	loadPlaying: (page) => dispatch(moviePlaying())
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviePlaying);
