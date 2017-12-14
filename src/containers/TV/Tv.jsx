import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import YouTube  from 'react-youtube';
import Popup from '../../components/Popup/Popup';
import Lightbox from 'react-image-lightbox';
import { onLoadTV, clearTvData, clearTvImages, clearTvSeason } from '../../actions/tv-actions';
import {Helmet} from 'react-helmet';
import NoImg from '../../img/NoImg.png';
import Spinner from '../../components/Spinner/Spinner';
import TVBg from '../../components/TV/TVBg';
import TVAside from '../../components/TV/TVAside';
import TVvideos from '../../components/TV/TVvideos';
import TVseasons from '../../components/TV/TVseasons';
import MediaStills from '../../components/MediaPage/MediaStills';
import MediaCast from '../../components/MediaPage/MediaCast';
import MediaRecommendations from '../../components/MediaPage/MediaRecommendations';
import TVSeason from '../../components/TV/TVSeason';
import  { ReactCSSTransitionGroup, CSSTransition }  from 'react-transition-group';

class TV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTrailer: false,
            trailerKey: '',
            lightBox: false,
            imgIndex: 0,
            imgCount: 11,
	        imgStatus: true,
            intervalId: 0,

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

	onLoadImg = (e) =>{
		e.target.classList.remove('img-loading');
		setTimeout(()=> this.setState({imgStatus: false}), 500);
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
		    seasons = this.props.tv.sortSeasons,
		    bgImages = this.props.tv.bgImages;
	    if (this.props.tv.isFetching) {
	    	let overview = this.props.EngData.tv[tv.id] ? this.props.EngData.tv[tv.id].overview : tv.overview,
			    title = this.props.EngData.tv[tv.id] ? this.props.EngData.tv[tv.id].name !== this.props.tv.tvTitles.title ? this.props.EngData.tv[tv.id].name : this.props.tv.tvTitles.title : this.props.tv.tvTitles.title;
	        return (
		            <div className="movie">
			            <Helmet>
				            <title>{title}</title>
			            </Helmet>
			            <TVBg
				            titles={this.props.tv.tvTitles}
				            title={title}
				            bg={bgImages}
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
						            id={tv.id}
						            bg={bgImages}
						            created_by={tv.created_by}
						            genres={tv.genres}
						            keywords={tv.keywords.results}
						            links={tv.external_ids}
						            homepage={tv.homepage}
						            origin_country={tv.origin_country}
						            first_air_date={tv.first_air_date}
						            last_air_date={tv.last_air_date}
						            in_production={tv.in_production}
						            imgStatus={this.state.imgStatus}
						            onLoadImg={this.onLoadImg}
					            />

					            <div className="overview">
						            {this.props.tv.tvTitles.seasonTitle !== null ? <div className="prev-page-link"><Link to={this.props.match.url} onClick={this.props.clearTvSeason} className='link-angle link-angle--left'><i className="fa fa-angle-left" aria-hidden="true" /><span>На страницу сериала</span></Link></div>:null}

						            <div className="description">
							            {overview ? <p className="description__text">{overview}</p>
								            :<div>
									            <div>Ой! Кажется описание к этому произведению отсутствует</div>
									            <div className='load-description-eng'>
										            <span onClick={()=>this.props.loadTvData(tv.id, 'en-US')}>Загрузить описание на английском?</span>
									            </div>
								            </div>}
						            </div>
						            {tv.videos.results.length >0 ? <TVvideos videos={this.props.tv.tvVideos} onClick={this.showTrailerModal}/> : null}
						            {this.props.tv.tvCredits.cast.length>0 ? <MediaCast cast={this.props.tv.tvCredits.cast}/>: null}
						            <Route path={`${this.props.match.url}/season-:season_number`} component={TVSeason}/>


						            {images.length>0 ? <MediaStills images={images} title='Кадры из сериала' imgCount={16} onClickImg={this.onClickImg}/>: null}

					            </div>
				            </div>
			            </div>

			            {tv.similar.total_results >0 ? <MediaRecommendations recommendations={tv.similar} listName='Похожие сериалы' typeList="tv"/> : null }
			            {tv.seasons.length>0 ? <TVseasons imgStatus={this.state.imgStatus} onLoadImg={this.onLoadImg} images={images} seasons={seasons} url={this.props.match.url} location={this.props.location.pathname}/>: null}
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
		    return  <Spinner />;

  }
}

function mapStateToProps(state) {
    return {
        tv: state.TVs.TvData,
	    EngData: state.General.EngDescription
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadTvData: (id, lang) => dispatch(onLoadTV(id, lang)),
    clearTvData: () => dispatch(clearTvData()),
	clearTvImages: () => dispatch(clearTvImages()),
	clearTvSeason: () => dispatch(clearTvSeason()),
});


export default connect(mapStateToProps, mapDispatchToProps)(TV);
