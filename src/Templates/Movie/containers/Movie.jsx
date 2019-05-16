import React, {Component} from 'react';
import { connect } from 'react-redux';
import YouTube  from 'react-youtube';
import Lightbox from 'lightbox-react';
import { Helmet } from 'react-helmet';

import { clearMovieData } from './../../../Data/actions/movies-actions';
import { onLoadMovie } from './../../../Data/api/Movies.api';

import { LoadEngData } from './../../../ui-components/loadEngData/LoadEngData';

import Popup from './../../Popup/Popup';
import MovieBG from './../components/MovieBg';
import MovieAside from './../components/MovieAside';
import MediaStills from './../../MediaPage/MediaStills';
import MediaCast from './../../MediaPage/MediaCast';
import MovieCollection from './../components/MovieCollection';
import MediaRecommendations from './../../MediaPage/MediaRecommendations';
import ServiceBlock from './../../Service/ServiceBlock';


class Movie extends Component {
    state = {
            modalTrailer: false,
	        trailerKey: '',
	        imgCount: 11,
	        imgStatus: true,
	        intervalId: 0
    };


    componentDidMount() {
	    if (window.pageYOffset === 0) {
		    clearInterval(this.state.intervalId);
	    }
        this.sendRequest();
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.props.match.params.id) {
			this.props.clearMovieData();
			this.sendRequest(nextProps.match.params.id);
			this.scrollToTop();
		}
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



	 onLoadImg = (e) =>{
	     e.target.classList.remove('img-loading');
	     setTimeout(()=> this.setState({imgStatus: false}), 500);
	 };

 render() {
  	const YouTubeParams = {
  		playerVars: { // https://developers.google.com/youtube/player_parameters
  			autoplay: 0
	    },
		height: '100%'
  	};
//TODO: add pre loader to request, and add loading text if don't have text in eng
	  const { imgIndex } = this.state;

	  const movie = this.props.movie.data;
      const { images } = this.props.movie;
      const { posters } = this.props.movie;

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

							 <LoadEngData
								 id={movie.id}
								 overview={movie.overview}
								 lang="en-US"
								 loadTvData={this.props.loadMovieData}
							 />

							 {movie.videos.results.length > 0
								 ? <div className="trailer">
									 <h2>{movie.videos.results.length === 1 ? 'Трейлер' : 'Трейлеры'}</h2>

									 <div className="trailer__list">
										 {movie.videos.results.map((video, indx)=>
											 video.site === 'YouTube' &&
												 <div className="trailer__preview" id={video.key} key={indx}>
													 <div className="preview-base" onClick={this.showTrailerModal}><i className="fa fa-play" aria-hidden="true"/></div>
													 <img src={'http://i3.ytimg.com/vi/' + video.key + '/mqdefault.jpg'} alt=""/>
												 </div>)}
									 </div>
								 </div>
								 : null}


							 <MediaCast cast={movie.credits.cast}/>
							 <MediaStills
								 images={images}
								 title="Кадры из фильма"
								 imgCount={16}
							 />
							 <MediaStills
                               images={posters}
                               title="Постеры"
							   posters={true}
                               imgCount={8}
                             />

						 </div>
					 </div>
				 </div>

				 {movie.belongs_to_collection && movie.collection.parts.length > 0 ?
					 <MovieCollection collection={movie.collection}/>
				 	: null
				 }

				 {movie.recommendations.total_results &&
					 <MediaRecommendations
						 recommendations={movie.recommendations}
						 listName="Вам может понравиться"
						 typeList="movie"/>}


				 {this.state.modalTrailer &&
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
					 </div>
					 }
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
