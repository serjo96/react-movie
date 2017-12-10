import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import Spinner from '../Spinner/Spinner';
import { friendlyUrl, friendlyData } from '../../utils/utils';

const MovieAside = (tv) => (
    <aside className="aside ">
        <div className="movie__poster">
            {tv.imgState ? <Spinner/>: null}
            <img onLoad={tv.onLoadImg} className="img-loading" src={(tv.bg.season_poster || tv.bg.poster || tv.bg.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (tv.bg.season_poster || tv.bg.poster || tv.bg.backdrop) :  NoImg} alt={tv.title}/>
        </div>

        <div className="crew-list infoTable-row">
            <div className="crew__item aside-row">
                <div className="crew__job">Создатели</div>
                <div className="crew__names aside-row__right-col">
                    {tv.created_by.map((men, indx)=> indx<3 ? <div className="crew__name" key={indx}><Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} className=" link">{men.name}</Link></div> :null)}
                </div>
            </div>
        </div>

        <div className="tv-release-date infoTable-row infoTable-border">
            <div className="aside__element-title">Давта выпуска</div>
            <div className="tv-release-date__date">
                <div>{tv.first_air_date ? friendlyData(tv.first_air_date): '-'}</div>
                <div>-</div>

                <div>{!tv.in_production ? tv.last_air_date !== null ? friendlyData(tv.last_air_date) : '...' : '-'}</div>

            </div>

        </div>

        <div className="production infoTable-row infoTable-border">
            <div className="aside-row">
                <div className="production__title">Страна</div>
                <div className="production__countries aside-row__right-col">
                    {tv.origin_country.map((el, index)=>
                        <div className="country"  key={index}>
                            <Link to={'/search/' + el} className="link">{el}</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="genres infoTable-row">
            <div className="genres__title">Жанр</div>
            <div className="genres__list">
                {tv.genres.map((el, indx)=>
	                <div className='genre' key={indx}>
                        <Link to={'/search?genres_tv-'+ el.id} className="tag"  id={el.id}>{el.name}</Link>
                    </div>
                )}
            </div>
        </div>

        <div className="keywords infoTable-row">
            <div className="keywords__title">Теги</div>
            <div className="keywords__list">
                {tv.keywords.map((el, indx)=> <Link to={`/search?keywords-${el.id}-${el.name}`} className="keyword tag" id={el.id} key={indx}>{el.name}</Link>)}
            </div>
        </div>

        <div className="movie-links infoTable-row">
            <div className="movie-links__title">Ссылки</div>
            <div className="movie-links__list">
                {tv.links.imdb_id ? <a href={'http://www.imdb.com/title/' + tv.links.imdb_id} target='_blank' className='social-link'>imdb</a>: null}
                {tv.links.tvdb_id ? <a href={'https://www.thetvdb.com/?tab=series&id=' + tv.links.tvdb_id} target='_blank' className='social-link'>tvdb</a>: null}
                <a href={'https://www.themoviedb.org/tv/' + tv.id} target='_blank' className='social-link'>TMDB</a>
                {tv.homepage ? <a href={tv.homepage} target='_blank' className='social-link'>Официальный сайт</a>: null}
            </div>
        </div>

    </aside>
);

export default (MovieAside);
