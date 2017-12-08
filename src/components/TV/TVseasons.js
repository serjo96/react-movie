import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import PropTypes from 'prop-types';


const TVseasons = ( tv ) => (
	<div className="tv-seasons"
	     style={tv.images.length > 0 ? {backgroundImage: 'url(https://image.tmdb.org/t/p/original' + tv.images[Math.floor(Math.random() * tv.images.length)].file_path + ')'} : null}>
		<div className="bg-base"/>
		<div className="tv-seasons__data">
			<div className="container">
				<h2 className='tv-seasons__title'>Сезоны</h2>
				<div className="seasons-list">
					{tv.seasons.map(( el, indx ) =>
						<div className="season-list__item" key={indx}>
							{tv.location !== `${tv.url}/season-${el.season_number}` ?
								<Link to={`${tv.url}/season-${el.season_number}`}>
									<div className={`season__img-cover ${tv.location !== tv.url ? 'season__img-cover--season-page': ''}`}>
										<img onLoad={tv.onLoadImg} className="img-loading" src={el.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + el.poster_path : NoImg} alt=""/>
									</div>
									<div className="season-number">{el.season_number > 0 ? el.season_number + ' сезон' : 'special'}</div>
								</Link>
								: <div className='active-season'>
									<div className={`season__img-cover`}>
										<img onLoad={tv.onLoadImg} className="img-loading" src={el.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + el.poster_path : NoImg} alt=""/>
									</div>
									<div className="season-number">{el.season_number > 0 ? el.season_number + ' сезон' : 'special'}</div>
								</div>}
						</div>
					)}
				</div>
			</div>
		</div>
	</div>
);

export default TVseasons;
