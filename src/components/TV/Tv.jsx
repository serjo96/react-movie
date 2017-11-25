import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import YouTube  from 'react-youtube';
import Popup from '../Popup/Popup';
import Lightbox from 'react-image-lightbox';
import { onLoadTV, clearTvData, clearTvImages } from '../../actions/tv-actions';
import {Helmet} from 'react-helmet';
import NoImg from '../../img/NoImg.png';
import TVBg from './TVBg';
import TVAside from './TVAside';
import MediaStills from '../MediaPage/MediaStills';
import MediaCast from '../MediaPage/MediaCast';
import MediaRecommendations from '../MediaPage/MediaRecommendations';
import TVSeason from './TVSeason';


class TV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTrailer: false,
            trailerKey: '',
            lightBox: false,
            imgIndex: 0,
            imgCount: 11,
            intervalId: 0
        };
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.props.match.params.id) {
			this.props.clearTvImages();
			this.sendRequest(nextProps.match.params.id);
			this.scrollToTop();
		}
	}


    componentDidMount() {
	    if (window.pageYOffset === 0) {
		    clearInterval(this.state.intervalId);
	    }
        this.sendRequest();
    }

    componentWillUnmount() {
    	this.props.clearTvData();
    }

	 sendRequest = (id = this.props.match.params.id) =>{
	     let movieId = id.split('-');
	     this.props.loadTvData(movieId.pop());
	 };

	 showTrailerModal = (e) =>{
	     this.setState({
	         modalTrailer: !this.state.modalTrailer,
	         trailerKey: e.target.closest('[id]').id
	     });
	 };


	 closePopup = () =>{
		 document.querySelector('.popup__content').classList.add('popup--is-hide');
		 setTimeout(()=> this.setState({modalTrailer: false}), 500);
	 };

	 _onReady = (event) => {
	     event.target.pauseVideo();
	 };

	 onClickImg = (e) =>{
	     this.setState({
	         imgIndex: e.target.dataset.index,
	         lightBox: !this.state.lightBox
	     });
	 };

	scrollStep = () => {
		if (window.pageYOffset === 0) {
			clearInterval(this.state.intervalId);
		}
		window.scroll(0, window.pageYOffset - 50);
	};

	scrollToTop = () => {
		let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
		this.setState({ intervalId: intervalId });
	};

  render() {
	        const { imgIndex } = this.state;
	        const YouTubeParams = {
				 height: '540',
				 width: '640',
				 playerVars: { // https://developers.google.com/youtube/player_parameters
					 autoplay: 0
				 }
		    };
    	let tv = this.props.tv.data,
		    images = this.props.tv.images,
		    seasons = this.props.tv.sortSeasons;
	    if (this.props.tv.isFetching) {
	        return (
		            <div className="movie">
			            <Helmet>
				            <title>{tv.name}</title>
			            </Helmet>

			            <TVBg
				            title={tv.original_name}
				            original_title={tv.name}
				            backdrop={tv.backdrop_path}
				            poster={tv.poster_path}
				            runtime={tv.episode_run_time}
				            seasons={tv.seasons}
				            vote_count={tv.vote_count}
				            vote_average={tv.vote_average}
				            popularity={tv.popularity}
				            tagline={tv.tagline}
				            number_of_seasons={tv.number_of_seasons}
				            first_air_date={tv.first_air_date}
				            in_production={tv.in_production}
			            />

			            <div className="container">
				            <div className="info-wrapper">

					            <TVAside
						            title={tv.name}
						            id={tv.id}
						            poster={tv.poster_path}
						            backdrop={tv.backdrop_path}
						            created_by={tv.created_by}
						            genres={tv.genres}
						            keywords={tv.keywords.results}
						            links={tv.external_ids}
						            homepage={tv.homepage}
						            origin_country={tv.origin_country}
						            first_air_date={tv.first_air_date}
						            last_air_date={tv.last_air_date}
						            in_production={tv.in_production}
					            />

					            <div className="overview">
						            <div className="description">
							            <p className="description__text">{tv.overview}</p>
						            </div>

						            {tv.videos.results.length >0 ?
							            <div className="trailer">
								            <h2>{tv.videos.results.length === 1 ? 'Трейлер' : 'Трейлеры'}</h2>

								            <div className="trailer__list">
									            {tv.videos.results.map((video, indx)=>
										            video.site === 'YouTube' &&
										            <div className="trailer__preview" id={video.key} key={indx}>
											            <div className="preview-base" onClick={this.showTrailerModal}><i className="fa fa-play" aria-hidden="true"/></div>
											            <img src={'http://i3.ytimg.com/vi/' + video.key + '/mqdefault.jpg'} alt=""/>
										            </div>)}
								            </div>
							            </div> : null}


						             <MediaStills images={images} title='Кадры из сериала' onClickImg={this.onClickImg}/>
						             <MediaCast cast={tv.credits.cast}/>

					            </div>
				            </div>
			            </div>

			            <Route path={`${this.props.match.url}/season-:season_number`} component={TVSeason}/>

			            {tv.similar.total_results >0 ? <MediaRecommendations recommendations={tv.similar} listName='Похожие сериалы' typeList="tv"/> : null }


			            {tv.seasons.length>0 ? <div className="tv-seasons" style={images.length > 0? {backgroundImage:  'url(https://image.tmdb.org/t/p/original' +  images[Math.floor(Math.random() * images.length)].file_path  + ')'}: null}>
				            <div className="bg-base"/>
				            <div className="tv-seasons__data">
				            <div className="container">
					            <h2 className='tv-seasons__title'>Сезоны</h2>
					            <div className="seasons-list">
							            {seasons.map((el, indx)=>
								            <div className="season" key={indx}>
									            <Link to={`${this.props.match.url}/season-${el.season_number}`}>
										            <img src={el.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + el.poster_path : NoImg} alt=""/>
										            <div className="season-number">{el.season_number>0 ? el.season_number + ' сезон': 'special'}</div>
									            </Link>
								            </div>
							            )}
					            </div>
				            </div>
				            </div>
			            </div>: null}

			            {tv.recommendations.total_results >0 ? <MediaRecommendations recommendations={tv.recommendations} listName='Вам может понравиться' typeList="tv"/> : null }


			            {this.state.lightBox ?
				            <Lightbox
					            mainSrc={'https://image.tmdb.org/t/p/w1280' + images[imgIndex].file_path}
					            nextSrc={'https://image.tmdb.org/t/p/w1280' + images[(imgIndex + 1) % images.length].file_path}
					            prevSrc={'https://image.tmdb.org/t/p/w1280' + images[(imgIndex + images.length - 1) % images.length].file_path}

					            onCloseRequest={() => this.setState({ lightBox: false })}
					            onMovePrevRequest={() => this.setState({
						            imgIndex: (imgIndex + images.length - 1) % images.length
					            })}
					            onMoveNextRequest={() => this.setState({
						            imgIndex: (imgIndex + 1) % images.length
					            })}
				            />: null}


			            {this.state.modalTrailer ?
				            <div className="popup-base" onClick={this.closePopup}>
					            <div className="popup" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
						            <div className="popup__close" onClick={this.closePopup}/>
						            <Popup>
							            <YouTube
								            videoId={this.state.trailerKey}
								            opts={YouTubeParams}
								            onReady={this._onReady}
							            />
						            </Popup>
					            </div>
				            </div>:null}
	                </div>
	        );
      } 
		    return null;
	    
  }
}

function mapStateToProps(state) {
    return {
        tv: state.TVs.TvData
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadTvData: (id) => dispatch(onLoadTV(id)),
    clearTvData: () => dispatch(clearTvData()),
	clearTvImages: () => dispatch(clearTvImages())
});


export default connect(mapStateToProps, mapDispatchToProps)(TV);
