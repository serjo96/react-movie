import React, {Component} from 'react';
import { connect } from 'react-redux';
import YouTube  from 'react-youtube';
import Lightbox from 'lightbox-react';
import { onLoadMovie, clearMovieData } from '../../actions/movies-actions';
import {Helmet} from 'react-helmet';
import Popup from '../../components/Popup/Popup';
import MovieBG from '../../components/Move/MovieBg';
import MovieAside from '../../components/Move/MovieAside';
import MediaStills from '../../components/MediaPage/MediaStills';
import MediaCast from '../../components/MediaPage/MediaCast';
import MovieCollection from '../../components/Move/MovieCollection';
import MediaRecommendations from '../../components/MediaPage/MediaRecommendations';
import ServiceBlock from '../../components/Service/ServiceBlock';


class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTrailer: false,
	        trailerKey: '',
	        lightBox: false,
	        imgIndex: 0,
	        imgCount: 11,
	        imgStatus: true,
	        intervalId: 0
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
	        this.props.clearMovieData();
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
    	this.props.clearMovieData();
    }


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

	 sendRequest = (id = this.props.match.params.id) =>{
	     let movieId = id.split('-');
	     this.props.loadMovieData(movieId.pop());
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

 render() {
  	const YouTubeParams = {
		    playerVars: { // https://developers.google.com/youtube/player_parameters
			    autoplay: 0
		    }
     };

	  const { imgIndex } = this.state;

	  const movie = this.props.movie.data,
		  images = this.props.movie.images;

		 return (
			 <ServiceBlock isLoading={this.props.movie.isFetching} isError={this.props.movie.status} fetch={this.sendRequest}>
				 <div className="movie" >
				 <Helmet>
					 <title>{movie.title}</title>
				 </Helmet>

				 <MovieBG original_title={movie.original_title}
				          title={movie.title}
				          backdrop={movie.backdrop_path}
				          poster={movie.poster_path}
				          runtime={movie.runtime}
				          budget={movie.budget}
				          revenue={movie.revenue}
				          lists={movie.lists}
				          release_date={movie.release_date}
				          vote_count={movie.vote_count}
				          vote_average={movie.vote_average}
				          popularity={movie.popularity}
				          tagline={movie.tagline}
				 />

				 <div className="container">
					 <div className="info-wrapper">

						 <MovieAside
							 title={movie.title}
							 id={movie.id}
							 poster={movie.poster_path}
							 backdrop={movie.backdrop_path}
							 crew={this.props.crew}
							 genres={movie.genres}
							 keywords={movie.keywords.keywords}
							 imdb_id={movie.imdb_id}
							 homepage={movie.homepage}
							 production_countries={movie.production_countries}
							 production_companies={movie.production_companies}
							 imgStatus={this.state.imgStatus}
							 onLoadImg={this.onLoadImg}
						 />

						 <div className="overview">
							 <div className="description">
								 {movie.overview ? <p className="description__text">{movie.overview}
								 </p>:
									 <div>
										 <div>Ой! Кажется описание к этому произведению отсутствует</div>
										 <div className="load-description-eng">
											 <span onClick={()=>this.props.loadMovieData(movie.id, 'en-US')}>Загрузить описание на английском?</span>
										 </div>
									 </div>}
							 </div>

							 {movie.videos.results.length >0 ?
								 <div className="trailer">
									 <h2>{movie.videos.results.length === 1 ? 'Трейлер' : 'Трейлеры'}</h2>

									 <div className="trailer__list">
										 {movie.videos.results.map((video, indx)=>
											 video.site === 'YouTube' &&
												 <div className="trailer__preview" id={video.key} key={indx}>
													 <div className="preview-base" onClick={this.showTrailerModal}><i className="fa fa-play" aria-hidden="true"/></div>
													 <img src={'http://i3.ytimg.com/vi/' + video.key + '/mqdefault.jpg'} alt=""/>
												 </div>)}
									 </div>
								 </div> : null}


							 <MediaCast cast={movie.credits.cast}/>
							 <MediaStills images={images} title="Кадры из фильма" imgCount={16} onClickImg={this.onClickImg}/>

						 </div>
					 </div>
				 </div>
				 {movie.belongs_to_collection && movie.collection.parts.length>0 ?
					 <MovieCollection collection={movie.collection}/>
				 	: null
				 }

				 {movie.recommendations.total_results >0 ? <MediaRecommendations recommendations={movie.recommendations} listName="Вам может понравиться" typeList="movie"/> : null }


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
						 <div className="popup popup--video">
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
			 </ServiceBlock>
		 );
 }
}

function mapStateToProps(state) {
    return {
        movie: state.Movies.MovieData,
	    crew: state.Movies.MovieData.crew
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovieData: (id, lang) => dispatch(onLoadMovie(id, lang)),
    clearMovieData: () => dispatch(clearMovieData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
