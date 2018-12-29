import React from 'react';
import PropTypes from 'prop-types';
import NoImg from './../../../assests/img/NoImg.png';
import { declOfNum, kFormatter, friendlyData, formatTime } from './../../../utils/utils';

const MovieBg = (movie) => (
    <div className="movie__bg" >
        <div
            className="movie__cover img-loading"
            style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (movie.backdrop || movie.poster) + ')'}}
        />
        <img
            className="bgPoster"
            src={'https://image.tmdb.org/t/p/original/' + (movie.backdrop || movie.poster)}
            alt="poster"
            onLoad={()=> document.querySelector('.movie__cover').classList.remove('img-loading')}
        />
        <div className="movie-info">
            <div className="shadow-base">

                <div className="container">
                    <div className="movie__summary">
                        <div className="mobile-poster">
                            <img
                                onLoad={e=> e.target.classList.remove('img-loading')}
                                 className="img-loading"
                                 src={movie.poster || movie.backdrop
                                     ? `https://image.tmdb.org/t/p/w185/${(movie.poster || movie.backdrop)}`
                                     : NoImg}
                                 alt="poster"/>
                        </div>
                        <h1 className="movie__title">
                            <div className="ru-title">{movie.title}</div>
                            <div className="original-title">{movie.original_title === movie.title ? null : movie.original_title}</div>
                        <span className="movie__year">{movie.release_date.substring(0, 4)}</span>
                        </h1>
                        <div className="tangle">{movie.tagline}</div>
                    </div>
                </div>
            </div>
            <div className="movie-ratings-wrap">
                <div className="container">
                    <div className="summary-ratings">
                        <div className="ratings" >
	                        <div className="summary-mobile-line">
                                <div className="rating summary-item">
                                    <div className={`icon fa fa-heart rating-${Math.ceil(movie.vote_average)}`}/>
                                    <div className="vote-numbers">
                                        <div className="rating__vote-count summary-item__title">{movie.vote_average} из 10</div>
                                        <div className="rating__count">{kFormatter(movie.vote_count)} {declOfNum(movie.vote_count, ['голос', 'голоса', 'голосов'])}</div>
                                    </div>
                                </div>
	                        </div>
	                        <div className="summary-mobile-line">
                                <div className="popularity summary-item">
                                    <div className="summary-item__title">Популярность</div>
                                    <div className="summary-item__number">{movie.popularity.toFixed(1)}</div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-item__title">Продолжительность</div>
                                    <div className="summary-item__number">{movie.runtime ? movie.runtime + 'мин' + ' / ' + formatTime(movie.runtime) + ' мин': '-'}</div>
                                </div>

                                    <div className="summary-item">
                                        <div className="summary-item__title">Бюджет</div>
                                        <div className="summary-item__number">{movie.budget ? '$' + movie.budget.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1 ') : '-'}</div>
                                    </div>
                                    <div className="summary-item">
                                        <div className="summary-item__title">Сборы в мире</div>
                                        <div className="summary-item__number">{movie.revenue ? '$'+ movie.revenue.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1 ') : '-'}</div>
                                    </div>

                                <div className="summary-item summary-item--collection">
                                    <div className="summary-item__title">В коллекциях</div>
                                    <div className="summary-item__number">{movie.lists.total_results === 0 ? '-': movie.lists.total_results}</div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-item__title">Дата выхода</div>
                                    <div className="summary-item__number">{friendlyData(movie.release_date)}</div>
                                </div>
	                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

MovieBg.propTypes = {
    original_title: PropTypes.string,
    title: PropTypes.string,
    backdrop: PropTypes.string,
    poster: PropTypes.string,
    runtime: PropTypes.number,
    budget: PropTypes.number,
    revenue: PropTypes.number,
    lists: PropTypes.object,
    release_date: PropTypes.string,
    vote_count: PropTypes.number,
    vote_average: PropTypes.number,
    popularity: PropTypes.number,
    tagline: PropTypes.string
};

export default MovieBg;
