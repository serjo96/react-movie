import React from 'react';
import {declOfNum, kFormatter, friendlyData, formatTime} from '../../utils/utils';

const MovieBg = (movie) => (
    <div className="movie__bg" >
        <div className="movie__cover img-loading" style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (movie.backdrop || movie.poster) + ')'}}/>
        <img src={'https://image.tmdb.org/t/p/original/' + (movie.backdrop || movie.poster)} alt={movie.title} onLoad={e=> document.querySelector('.movie__cover').classList.remove('img-loading')}/>
        <div className="movie-info">
            <div className="shadow-base">

                <div className="container">
                    <div className="movie__summary">
                        <h1 className="movie__title">
                            <div className="ru-title">{movie.title}</div>
                            <div className="original-title">{movie.original_title === movie.title ? null : movie.original_title}</div>
                        </h1>
                        <span className="movie__year">{movie.release_date.substring(0, 4)}</span>
                            <div className="tangle">{movie.tagline}</div>
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
                                    <div className="rating__vote-count summary-item__title">{movie.vote_average} из 10</div>
                                    <div className="rating__count">{kFormatter(movie.vote_count)} {declOfNum(movie.vote_count, ['голос', 'голоса', 'голосов'])}</div>
                                </div>
                            </div>
                            <div className="popularity summary-item">
                                <div className="summary-item__title">Популярность</div>
                                <div className="summary-item__number">{movie.popularity.toFixed(1)}</div>
                            </div>
                            <div className="summary-item">
                                <div className="summary-item__title">Продолжиельность</div>
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
                            <div className="summary-item">
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
);

export default MovieBg;
