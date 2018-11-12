import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../../assests/img/NoImg.png';
import PropTypes from 'prop-types';
import Spinner from '../../Spinner/Spinner';

class TVseasons extends Component {
	constructor( props ) {
		super(props);
		this.state = {
			imgStatus: true,
		}
	}

	onLoadImg = (e) =>{
		e.target.classList.remove('img-loading');
		setTimeout(()=> this.setState({imgStatus: false}), 500);
	};

	render() {
		return (


			<div className="tv-seasons"
			     style={this.props.images.length > 0 ? {backgroundImage: 'url(https://image.tmdb.org/t/p/original' + this.props.images[Math.floor(Math.random() * this.props.images.length)].file_path + ')'} : null}>
				<div className="bg-base"/>
				<div className="tv-seasons__data">
					<div className="container">
						<h2 className='tv-seasons__title'>Сезоны</h2>
						<div className="seasons-list">
							{this.props.seasons.map(( el, indx ) =>
								<div className="season-list__item" key={indx}>
									{this.props.location !== `${this.props.url}/season-${el.season_number}` ?
										<Link to={`${this.props.url}/season-${el.season_number}`}>
											<div
												className={`season__img-cover ${this.props.location !== this.props.url ? 'season__img-cover--season-page' : ''}`}>
												{this.state.imgStatus ? <Spinner/> : null}
												<img onLoad={this.onLoadImg} className="img-loading"
												     src={el.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + el.poster_path : NoImg}
												     alt=""/>

											</div>
											<div
												className="season-number">{el.season_number > 0 ? el.season_number + ' сезон' : 'special'}</div>
										</Link>
										: <div className='active-season'>
											<div className={`season__img-cover`}>
												{this.state.imgStatus ? <Spinner/> : null}
													<img onLoad={this.onLoadImg} className="img-loading"
													     src={el.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + el.poster_path : NoImg}
													     alt=""/>

											</div>
											<div className="season-number">{el.season_number > 0 ? el.season_number + ' сезон' : 'special'}</div>
										</div>}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default TVseasons;
