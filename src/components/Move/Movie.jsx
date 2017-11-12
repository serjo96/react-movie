import React, {Component} from 'react';
import { connect } from 'react-redux';
import YouTube  from 'react-youtube';
import Lightbox from 'react-image-lightbox';
import { onLoadMovie, clearMovieData } from '../../actions/movies-action';
import {Helmet} from 'react-helmet';
import Popup from '../Popup/Popup';
import MovieBG from './MovieBg';
import MovieAside from './MovieAside';
import MovieStills from './MovieStills';
import MovieCast from './MovieCast';
import MovieCollection from './MovieCollection';
import MovieRecommendations from './MovieRecommendations';


class Movie extends Component {
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
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.sendRequest();
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

	 sendRequest = () =>{
	     let movieId = this.props.location.pathname.split('-');
	     this.props.loadMovieData(movieId.pop());
	 };

	 showTrailerModal = (e) =>{
	     this.setState({
		     modalTrailer: !this.state.modalTrailer,
		     trailerKey: e.target.closest('[id]').id
	     });
	 };

	 closePopup = () =>{
	     this.setState({modalTrailer: false});
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

  render() {
  	const YouTubeParams ={
		    height: '540',
		    width: '640',
		    playerVars: { // https://developers.google.com/youtube/player_parameters
			    autoplay: 0
		    }
      };

	  const { imgIndex } = this.state;

	  const movie = this.props.movie.data,
		  images = this.props.movie.images,
		  crew = this.props.crew;
 	if (this.props.movie.isFetching) {
		 return (
			 <div className="movie">
				 <Helmet>
					 <title>{movie.title}</title>
				 </Helmet>
				 {this.state.modalTrailer &&
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
					 </div>}

				 {this.state.lightBox &&
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
				 />
				 }

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
							 poster={movie.poster_path}
							 backdrop={movie.backdrop_path}
							 crew={this.props.crew}
							 genres={movie.genres}
							 keywords={movie.keywords.keywords}
							 imdb_id={movie.imdb_id}
							 production_countries={movie.production_countries}
						 />

						 <div className="overview">
							 <div className="description">
								 <p className="description__text">{movie.overview}</p>
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


							 <MovieStills images={images} onClickImg={this.onClickImg}/>
							 <MovieCast cast={movie.credits.cast}/>

						 </div>
					 </div>
				 </div>
				 {movie.belongs_to_collection ?
					 <MovieCollection collection={movie.collection}/>
				 	: null
				 }

				 {movie.recommendations.total_results >0 ? <MovieRecommendations recommendations={movie.recommendations}/> : null }


			 </div>
	        );
      }
		    return null;
	    
  }
}

function mapStateToProps(state) {
    return {
        movie: state.MovieData,
	    crew: state.MovieData.crew
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovieData: (id) => dispatch(onLoadMovie(id)),
    clearMovieData: () => dispatch(clearMovieData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
