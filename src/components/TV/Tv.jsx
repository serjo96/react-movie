import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import { onLoadTV } from '../../actions/movies-action';
import { clearTvData } from '../../actions/movies-action';
import {Helmet} from 'react-helmet';
import {declOfNum, kFormatter} from '../../utils/utils';

class TV extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.sendRequest();
        }
    }

    componentDidMount() {
        this.sendRequest();
    }

    componentWillUnmount() {
    	this.props.clearTvData();
    }

 sendRequest = () =>{
     let movieId = this.props.location.pathname.split('-');
     this.props.loadTvData(movieId.pop());
 };

 render() {
    	let movie = this.props.tv.data;
	    if (this.props.tv.isFetching) {
	        return (
		            <div className="movie">
			            <Helmet>
				            <title>{movie.title}</title>
			            </Helmet>
		                <div className="movie__bg img-loading" onLoad={e=> e.target.closest('.movie__bg').classList.remove('img-loading')}>
			                <div className="movie__cover " style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (movie.backdrop_path || movie.poster_path) + ')'}}/>
			                <img src={'https://image.tmdb.org/t/p/original/' + (movie.backdrop_path || movie.poster_path)} alt={movie.name} />
			                <div className="movie-info">
                                <div className="shadow-base">
	                                 <div className="container">
					                    <div className="movie__summary">
						                    <h1 className="movie__title">
							                    <div className="ru-title">{movie.name}</div>
							                    <div className="original-title">{movie.original_name === movie.name ? null : movie.original_name}</div>
						                    </h1>
						                    <span className="movie__year">{movie.first_air_date.substring(0, 4)}</span>
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
									                <div className="summary-item__title">Количество сезонов</div>
									                <div className="summary-item__number">{movie.number_of_seasons ? movie.number_of_seasons : '-'}</div>
								                </div>
                                                <div className="summary-item">
									                <div className="summary-item__title">Статус</div>
									                <div className="summary-item__number">{movie.in_production ? 'Идет ' + movie.number_of_seasons + ' сезон' : 'Закончен'}</div>
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
						            <div className="description">
							            <h2 className="description__title">Сюжет</h2>
						                <p className="description__text">{movie.overview}</p>
						            </div>
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
        tv: state.TvData
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadTvData: (id) => dispatch(onLoadTV(id)),
	clearTvData: () => dispatch(clearTvData())
});


export default connect(mapStateToProps, mapDispatchToProps)(TV);
