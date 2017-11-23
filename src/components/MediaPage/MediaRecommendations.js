import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import MovieItem from '../MediaList/MediaItem';

const SwiperParam = {
	slidesPerView: 8,
	setWrapperSize: true,
	mousewheel: {
		sensitivity: 150
	}
};


class MediaRecommendations extends Component {
	showSliderNotice = (e) => {
		// e.target.closest('.scroll-notice').style.display = 'flex';
	};

	render(){
		return(
		<div className="recommendations">
			<div className="container">
				<h3 className="recommendations__title">{this.props.listName}</h3>
			</div>
			<div className="recommendations__list tooltip-parent" onWheel={this.showSliderNotice}>
				<div className="scroll-notice"><span>Для того что бы использовать колесико мыши для прокрутки, зажмите Cntrl + прокручивайте колесико мыши</span></div>
				<Swiper {...SwiperParam} shouldSwiperUpdate={true} containerClass={ `swiper-container ${this.props.recommendations.total_results < 10 ? 'slider-container--centered' : null}`}>
					{this.props.recommendations.results.map((el, index)=>
						(<div key={index}>
							<MovieItem
								title={el.title || el.name}
								original_title={el.original_title || el.original_name}
								overview={el.overview}
								voteAverage={el.vote_average}
								date={el.release_date || el.first_air_date}
								poster={el.poster_path}
								id={el.id}
								typeList={this.props.typeList}
							/>

						</div>)
					)}
				</Swiper>
			</div>
		</div>
	)};
}

export default (MediaRecommendations);
