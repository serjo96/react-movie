import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import { friendlyUrl } from '../../utils/utils';

const MovieAside = (movie) => (
    <aside className="movie__aside">
        <div className="movie__poster"><img src={(movie.poster || movie.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (movie.poster || movie.backdrop) :  NoImg} alt={movie.title}/></div>
        <div className="crew-list">

            <div className="crew__item aside-row">
                <div className="crew__job">Режиссер</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Director.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

            <div className="crew__item aside-row">
                <div className="crew__job">Сценарий</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Screenplay.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

	        <div className="crew__item aside-row">
                <div className="crew__job">Продюсер</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Producer.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

            <div className="crew__item aside-row">
                <div className="crew__job">Оператор</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Director_of_Photography.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link> :null)}
                </div>
            </div>

            <div className="crew__item aside-row">
                <div className="crew__job">Композитор</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Music.map((men, indx)=> indx<=3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>: null)}
                </div>
            </div>

            <div className="crew__item aside-row">
                <div className="crew__job">Художник</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Art.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>
        </div>

        <div className="production">
            <div className="aside-row">
                <div className="production__title">Страна</div>
                <div className="production__countries aside-row__right-col">
                    {movie.production_countries.map((el, index)=>
                        <Link to={'/search/' + el.name} className="country link" key={index}>{el.name}</Link>
                    )}
                </div>
            </div>
        </div>

        <div className="genres">
            <div className="genres__title">Жанр</div>
            <div className="genres__list">
                {movie.genres.map((el, indx)=>
                    <Link to={'/search/genres/'+ el.id} className="genre tag" key={indx} id={el.id}>{el.name}</Link>
                )}
            </div>
        </div>

        <div className="keywords">
            <div className="keywords__title">Теги</div>
            <div className="keywords__list">
                {movie.keywords.map((el, indx)=> <Link to={'/search/keywords/'+ el.id} className="keyword tag" id={el.id} key={indx}>{el.name}</Link>)}
            </div>
        </div>

        <div className="movie-links">
            <div className="movie-links__title">Ссылки</div>
            <div className="movie-links__list">
                {movie.imdb_id ? <a href={'http://www.imdb.com/title/' + movie.imdb_id} target='_blank' className='movie__social-link'>imdb</a>: null}
                {movie.homepage ? <a href={movie.homepage} target='_blank' className='movie__social-link'>Страница фильма</a>: null}
            </div>
        </div>

    </aside>
);

export default (MovieAside);
