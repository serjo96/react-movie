import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';

import { AppDispatch, RootState } from '~/store/configureStore';
import { Languages } from '~/store/Reducers/generalReducer';
import MovieAside from './../components/movie-aside';
import MediaStills from '~/templates/media-page/media-stills';
import MediaCast from '~/templates//media-page/media-cast';
import {getMovieData, getMovieEngOverview} from '~/store/movies/movies.api';
import MediaTop from '~/templates/media-page/media-top';
import { MovieSummary } from '~/templates/Movie/components/movie-summary';
import ServiceBlock from '~/templates/Service/ServiceBlock';
import MediaRecommendations from '~/templates/media-page/media-recommendations';
import MovieCollection from '~/templates/Movie/components/movie-collection';
import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { VideosSection } from '~/ui-components/video-section/videos-section';
import { MediaType } from '~/core/types/media-type';

interface MyState {
  imgCount: number,
  imgStatus: boolean,
}

interface MyProps extends RouteComponentProps<{id?: string}>{
  movie: RootState['movies']['data'];
  isFetching: boolean;
  isSuccessful: boolean;
  getMovieData: typeof getMovieData;
  getMovieEngData: typeof getMovieEngOverview;
}

class Movie extends Component<MyProps, MyState> {
  state = {
    imgCount: 11,
    imgStatus: true
  };

  componentDidMount () {
    this.sendRequest();
  }

  componentWillReceiveProps (nextProps: MyProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.sendRequest(nextProps.match.params.id);
      this.scrollToTop();
    }
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  sendRequest = (id = this.props.match.params.id) => {
    const movieId = id.split('-').pop();
    this.props.getMovieData({ id: movieId });
  };

  handlerOnFetchEngData = () => {
    this.props.getMovieEngData({ id: `${this.props.movie.id}`, lang: Languages.EN });
  };

  render () {
    const movie = this.props.movie;
    const { isSuccessful, isFetching } = this.props;

    return (
      <ServiceBlock
        isLoading={isFetching}
        isError={!isSuccessful}
        fetch={this.sendRequest}
      >
        <div className='movie'>
          <Helmet>
            <title>{movie.title}</title>
          </Helmet>

          <MediaTop
            title={movie.title}
            originalTitle={movie.originalTitle}
            backdrop={movie.backdropPath}
            poster={movie.posterPath}
            releaseDate={movie.releaseDate}
            tagline={movie.tagline}
          >
            <MovieSummary />
          </MediaTop>

          <div className='container'>
            <div className='info-wrapper'>

              <MovieAside
                id={movie.id}
                poster={movie.posterPath}
                backdrop={movie.backdropPath}
                crew={movie.credits.crew}
                genres={movie.genres}
                keywords={movie.keywords.keywords}
                imdbId={movie.imdbId}
                homepage={movie.homepage}
                productionCountries={movie.productionCountries}
                productionCompanies={movie.productionCompanies}
              />

              <div className='overview'>
                <MovieDescription
                  overview={movie.overview}
                  fetchEngData={this.handlerOnFetchEngData}
                />

                <VideosSection videos={movie.videos} />

                <MediaCast cast={movie.credits.cast} />
                <MediaStills
                  images={movie.images.backdrops}
                  title='Кадры из фильма'
                  imgCount={16}
                />

                <MediaStills
                  images={movie.images.posters}
                  title='Постеры'
                  posters
                  imgCount={8}
                />
              </div>
            </div>
          </div>

          <MovieCollection collection={movie.collection} />
          <MediaRecommendations
            recommendations={movie.recommendations}
            listName='Вам может понравиться'
            typeList={MediaType.MOVIE}
          />
        </div>
      </ServiceBlock>
    );
  }
}

function mapStateToProps (state: RootState) {
  return {
    movie: state.movies.data,
    isSuccessful: state.movies.isSuccessful,
    isFetching: state.movies.isFetching
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMovieData: bindActionCreators(getMovieData, dispatch),
  getMovieEngData: bindActionCreators(getMovieEngOverview, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
