import React, {Component} from 'react';
import { connect } from 'react-redux';
import YouTube  from 'react-youtube';
import Lightbox from 'react-image-lightbox';
import NoImg from '../../img/NoImg.png';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import { onLoadMovie } from '../../actions/movies-action';
import { clearMovieData } from '../../actions/movies-action';
import {Helmet} from 'react-helmet';
import { friendlyUrl } from '../../utils/utils';
import Popup from '../Popup/Popup';
import MovieBG from './MovieBg';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTrailer: false,
	        trailerKey: '',
	        lightBox: false,
	        imgIndex: 0
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.sendRequest();
        }
    }

    componentDidMount() {
        this.sendRequest();
    }

    componentWillUnmount() {
    	this.props.clearMovieData();
    }

	 sendRequest = () =>{
	     let movieId = this.props.location.pathname.split('-');
	     this.props.loadMovieData(movieId[1]);
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


  render() {
  	const YouTubeParams ={
		    height: '540',
		    width: '640',
		    playerVars: { // https://developers.google.com/youtube/player_parameters
			    autoplay: 0
		    }
          };

 	const SwiperParams = {
		    scrollbar: {
			    el: '.swiper-scrollbar',
			    hide: false,
			    draggable: true
		    },
	        slidesPerView: 8,
	        spaceBetween: 20,
	        mousewheel: {
		        sensitivity: 150
	        }
          };

	  const { imgIndex } = this.state;

	  const movie = this.props.movie.data,
		  images = this.props.movie.images;
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
						 imgIndex: (imgIndex + images.length - 1) % images.length,
					 })}
					 onMoveNextRequest={() => this.setState({
						 imgIndex: (imgIndex + 1) % images.length,
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
				 />

				 <div className="container">
					 <div className="info-wrapper">

						 <aside className="movie__aside">
							 <div className="movie__poster"><img src={(movie.poster_path || movie.backdrop_path) ? 'https://image.tmdb.org/t/p/w185/' + (movie.poster_path || movie.backdrop_path) :  NoImg} alt={movie.title}/></div>
						 </aside>

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

							 <div className="stills">
								 {images.map((backdrop, indx)=>
								    <div className="stills__img"
								         key={indx}
								         data-index={indx}
								         style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + backdrop.file_path + ')'}}
								         onClick={e=> this.setState({
									         imgIndex: e.target.dataset.index,
									         lightBox: !this.state.lightBox
								         })}
								    />
								 )}
							 </div>

							 <div className="credits">
								 <div className="cast">
									 <h2 className="cast__title">В ролях</h2>
									 <Swiper {...SwiperParams}>
									 {movie.credits.cast.map((actor, indx) =>
										 (<Link to={'/actor/'+ friendlyUrl(actor.name)} className="actor" id={actor.id} key={indx}>
											 <div className="actor__img" style={{backgroundImage: actor.profile_path ? 'url(https://image.tmdb.org/t/p/w185/' + actor.profile_path + ')': 'url('+ NoImg + ')'}} />
										    <div className="actor__info">
											    <div className="actor__name">{actor.name}</div>
											    {actor.character  &&
											    <div className="actor__role">{actor.character}</div>
											    }
										    </div>
										 </Link>)
									 )}
									 </Swiper>
								 </div>
							 </div>

						 </div>
					 </div>
				 </div>
			 </div>
	        );
      }
		    return null;
	    
  }
}

function mapStateToProps(state) {
    return {
        movie: state.MovieData,
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovieData: (id) => dispatch(onLoadMovie(id)),
    clearMovieData: () => dispatch(clearMovieData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Movie);
