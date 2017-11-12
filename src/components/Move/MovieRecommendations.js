import React from 'react';
import Swiper from 'react-id-swiper';
import MovieItem from './MovieItem';

const SwiperParam = {
	slidesPerView: 8,
	setWrapperSize: true,
	mousewheel: {
		sensitivity: 150
	}
};

const MovieRecommendations = (movie) => (
	<div className="recommendations">
		<div className="container">
			<h3 className="recommendations__title">Вам может понравиться</h3>
		</div>
		<div className="recommendations__list tooltip-parent">
			<Swiper {...SwiperParam} shouldSwiperUpdate={true}>
				{movie.recommendations.results.map((el, index)=>
					(<div key={index}>
						<MovieItem
							title={el.title}
							original_title={el.original_title}
							overview={el.overview}
							voteAverage={el.vote_average}
							date={el.release_date}
							poster={el.poster_path}
							id={el.id}
						/>

					</div>)
				)}
			</Swiper>
		</div>
	</div>
);

export default (MovieRecommendations);
