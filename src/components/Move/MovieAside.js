import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import { friendlyUrl } from '../../utils/utils';

const MovieAside = (movie) => (
	<aside className="movie__aside">
        <div className="movie__poster"><img src={(movie.poster || movie.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (movie.poster || movie.backdrop) :  NoImg} alt={movie.title}/></div>
        <div className="crew-list">

            <div className="crew__item">
                <div className="crew__job">Режиссер</div>
                <div className="crew__names">
                    {movie.crew.Director.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

            <div className="crew__item">
                <div className="crew__job">Сценарий</div>
                <div className="crew__names">
                    {movie.crew.Screenplay.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

	        <div className="crew__item">
                <div className="crew__job">Продюсер</div>
                <div className="crew__names">
                    {movie.crew.Producer.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
                </div>
            </div>

			<div className="crew__item">
				<div className="crew__job">Оператор</div>
				<div className="crew__names">
					{movie.crew.Director_of_Photography.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link> :null)}
				</div>
			</div>

			<div className="crew__item">
				<div className="crew__job">Композитор</div>
				<div className="crew__names">
					{movie.crew.Music.map((men, indx)=> indx<=3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>: null)}
				</div>
			</div>

			<div className="crew__item">
				<div className="crew__job">Художник</div>
				<div className="crew__names">
					{movie.crew.Art.map((men, indx)=> indx<3 ? <Link to={'/person/'+ friendlyUrl(men.name)+ '-' + men.id} key={indx} className="crew__name link">{men.name}</Link>:null)}
				</div>
			</div>
        </div>
		<div className="genres">
			<div className="genres__title">Жанр</div>
			<div className="genres__list">
				{movie.genres.map((el, indx)=>
					<Link to={'/search/'} className="genres__item" key={indx} id={el.id}>{el.name}</Link>
				)}
			</div>
		</div>

    </aside>
);

export default (MovieAside);
