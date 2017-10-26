import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import { onLoadMovie } from '../../actions/movies-action';
import { clearMovieData } from '../../actions/movies-action';
import {Helmet} from 'react-helmet';
import {declOfNum, kFormatter} from '../../utils/utils';

class Movie extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.sendRequest();
        }
    }

    componentDidMount() {
        this.sendRequest();
    }

    componentWillUnmount() {
    	this.props.clearMovieData();
    }

 sendRequest = () =>{
     let movieId = this.props.location.pathname.split('-');
     this.props.loadMovieData(movieId[1]);
 };

 render() {
    	let movie = this.props.movie.data;
	    if (this.props.movie.isFetching) {
	        return (
		            <div className="movie">
			            <Helmet>
				            <title>{movie.title}</title>
			            </Helmet>
		                <div className="movie__bg img-loading" onLoad={e=> e.target.closest('.movie__bg').classList.remove('img-loading')}>
			                <div className="movie__cover " style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (movie.backdrop_path || movie.poster_path) + ')'}}/>
			                <img src={'https://image.tmdb.org/t/p/original/' + (movie.backdrop_path || movie.poster_path)} alt={movie.title} />
			                <div className="movie-info">
                                <div className="shadow-base">
	                                 <div className="container">
					                    <div className="movie__summary">
						                    <h1 className="movie__title">
							                    <div className="ru-title">{movie.title}</div>
							                    <div className="original-title">{movie.original_title === movie.title ? null : movie.original_title}</div>
						                    </h1>
						                    <span className="movie__year">{movie.release_date.substring(0, 4)}</span>
					                    </div>
	                                 </div>
                                </div>
				                <div className="movie-ratings-wrap">
					                <div className="container">
						                <div className="summary-ratings">
							                <div className="ratings" >
							                    <div className="rating summary-item">
								                    <div className={'icon fa fa-heart rating-' + Math.ceil(movie.vote_average)}/>
								                    <div className="vote-numbers">
									                    <div className="rating__vote-count">{movie.vote_average} из 10</div>
									                    <div className="rating__count">{kFormatter(movie.vote_count)} {declOfNum(movie.vote_count, ['голос', 'голоса', 'голосов'])}</div>
								                    </div>
							                    </div>
								                <div className="popularity summary-item">
									                <div className="summary-item__title">Популярность</div>
									                <div className="summary-item__number">{movie.popularity.toFixed(1)}</div>
								                </div>
								                <div className="summary-item">
									                <div className="summary-item__title">Продолжиельность</div>
									                <div className="summary-item__number">{movie.runtime ? movie.runtime + ' мин': '-'}</div>
								                </div>
								                <div className="summary-item">
									                <div className="summary-item__title">Бюджет</div>
									                <div className="summary-item__number">{movie.budget ? '$' + movie.budget.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ") : '-'}</div>
								                </div>
								                <div className="summary-item">
									                <div className="summary-item__title">Сборы в мире</div>
									                <div className="summary-item__number">{movie.revenue ? '$'+ movie.revenue.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ") : '-'}</div>
								                </div>
								                <div className="summary-item">
									                <div className="summary-item__title">В коллекциях</div>
									                <div className="summary-item__number">{movie.lists.total_results === 0 ? '-': movie.lists.total_results}</div>
								                </div>
							                </div>
						                </div>
					                </div>
				                </div>
			                </div>
		                </div>
			            <div className="container">
				            <div className="info-wrapper">
					            <aside className="movie__aside">
						            <div className="movie__poster"><img src={(movie.poster_path || movie.backdrop_path) ? 'https://image.tmdb.org/t/p/w185/' + (movie.poster_path || movie.backdrop_path) :  NoImg} alt={movie.title}/></div>
					            </aside>
					            <div className="overview">
						            <p className="movie__overview">{movie.overview}</p>
					            </div>
				            </div>
			            </div>
	                </div>
	        );
     } 
		    return null;
	    
 }
}

function mapStateToProps(state) {
    return {
        movie: state.MovieData
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovieData: (id) => dispatch(onLoadMovie(id)),
    clearMovieData: () => dispatch(clearMovieData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
