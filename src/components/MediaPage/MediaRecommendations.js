import React from 'react';
import Swiper from 'react-id-swiper';
import MovieItem from '../MediaList/MediaItem';

const SwiperParam = {
    slidesPerView: 8,
    setWrapperSize: true,
    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
	    disabledClass: 'slider-button--isDisabled'
    }
};

const MediaRecommendations = (movie) => (
    <div className="recommendations">
        <div className="container">
            <h3 className="recommendations__title">{movie.listName}</h3>
        </div>
        <div className="recommendations__list tooltip-parent">
            <Swiper {...SwiperParam}
                shouldSwiperUpdate={true}
                containerClass={ `swiper-container ${movie.recommendations.total_results < 10 ? 'slider-container--centered' : null}`}
                navigation={movie.recommendations.total_results > 10 ? {
		            nextEl: '.slider-button-next',
		            prevEl: '.slider-button-prev',
		            disabledClass: 'slider-button--isDisabled'
                } : {
	                nextEl: null,
	                prevEl: null,
                }}
            >
                {movie.recommendations.results.map((el, index)=>
                    (<div key={index}>
                        <MovieItem
                            title={el.title || el.name}
                            original_title={el.original_title || el.original_name}
                            overview={el.overview}
                            voteAverage={el.vote_average}
                            date={el.release_date || el.first_air_date}
                            poster={el.poster_path}
                            id={el.id}
                            typeList={movie.typeList}
                        />

                    </div>)
                )}
            </Swiper>
        </div>
    </div>
);

export default (MediaRecommendations);
