import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import Spinner from '../Spinner/Spinner';
import { friendlyUrl, urlRusLat } from '../../utils/utils';

const MovieAside = (movie) => (
    <aside className="aside">
        <div className="movie__poster">
	        {movie.imgState ? <Spinner/>: null}
            <img onLoad={movie.onLoadImg} className="img-loading" src={(movie.poster || movie.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (movie.poster || movie.backdrop) :  NoImg} alt={movie.title}/>
        </div>
        <div className="crew-list infoTable-row">

            <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Режиссер</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Director.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div>:null)}
                </div>
            </div>

            <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Сценарий</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Screenplay.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div>:null)}
                </div>
            </div>

	        <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Продюсер</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Producer.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div>:null)}
                </div>
            </div>

            <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Оператор</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Director_of_Photography.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div> :null)}
                </div>
            </div>

            <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Композитор</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Music.map((men, indx)=> indx<=3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div> : null)}
                </div>
            </div>

            <div className="crew__item infoTable-border aside-row">
                <div className="crew__job">Художник</div>
                <div className="crew__names aside-row__right-col">
                    {movie.crew.Art.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className="link">{men.name}</Link></div> :null)}
                </div>
            </div>
        </div>

        <div className="production">
            <div className="aside-row">
                <div className="production__title">Страна</div>
                <div className="production__countries aside-row__right-col">
                    {movie.production_countries.map((el, index)=>
                        <div className="country" key={index}>
                            <Link to={'/search/' + el.name} className="link" >{el.name}</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="genres infoTable-row">
            <div className="genres__title">Жанр</div>
            <div className="genres__list">
                {movie.genres.map((el, indx)=>
                    <div className='genre' key={indx}>
                        <Link to={`/lists/genres_movie/${urlRusLat(el.name)}-${el.id}`} className="tag"  id={el.id}>{el.name}</Link>
                    </div>
                )}
            </div>
        </div>

        <div className="keywords infoTable-row">
            <div className="keywords__title">Теги</div>
            <div className="keywords__list">
                {movie.keywords.map((el, indx)=> <Link to={`/lists/keywords_movie/${friendlyUrl(el.name)}-${el.id}`} className="keyword tag" id={el.id} key={indx}>{el.name}</Link>)}
            </div>
        </div>

        <div className="movie-links infoTable-row">
            <div className="movie-links__title">Ссылки</div>
            <div className="movie-links__list">
                {movie.imdb_id ? <a href={'http://www.imdb.com/title/' + movie.imdb_id} target='_blank' className='social-link'>imdb</a>: null}
                <a href={'https://www.themoviedb.org/movie/' + movie.id} target='_blank' className='social-link'>TMDB</a>
                {movie.homepage ? <a href={movie.homepage} target='_blank' className='social-link'>Страница фильма</a>: null}
            </div>
        </div>

    </aside>
);

export default (MovieAside);
