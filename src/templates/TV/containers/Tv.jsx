import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import YouTube from 'react-youtube';
import Lightbox from 'lightbox-react';

import { onLoadTV } from '~/store/api/tv.api';
import { clearTvData, clearTvSeason } from '~/store/actions/tv-actions';

import Popup from '../../popup/popup.tsx';
import ServiceBlock from '../../service/service-block';
import TVBg from './../components/TVBg';
import TVAside from './../components/TVAside.jsx';
import TVvideos from './../components/TVvideos';
import TVseasons from './../components/TVseasons.jsx';
import MediaStills from '../../media-page/media-stills.tsx';
import MediaCast from '../../media-page/media-cast';
import MediaRecommendations from '../../media-page/media-recommendations';
import TVSeason from './../components/TVSeason.jsx';
import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';

class TV extends Component {
  state = {
    modalTrailer: false,
    trailerKey: '',
    lightBox: false,
    imgIndex: 0,
    imgCount: 11,
    intervalId: 0
  };

  componentDidMount () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.sendRequest();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.clearTvData();
      this.sendRequest(nextProps.match.params.id);
      this.scrollToTop();
    }
  }

  componentWillUnmount () {
    this.props.clearTvData();
  }

  sendRequest = (id = this.props.match.params.id) => {
    const movieId = id.split('-');
    this.props.loadTvData(movieId.pop());
  };

  showTrailerModal = (e) => {
    this.setState({
      modalTrailer: !this.state.modalTrailer,
      trailerKey: e.target.closest('[id]').id
    });
  };

  closePopup = () => {
    document.querySelector('.popup__content').classList.add('popup--is-hide');
    setTimeout(() => this.setState({ modalTrailer: false }), 500);
  };

  _onReady = (event) => {
    event.target.pauseVideo();
  };

  onClickImg = (e) => {
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
    const intervalId = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({ intervalId: intervalId });
  };

  handlerOnFetchEngData = () => {
    this.props.loadTvData(this.props.tv.data.id, 'en-US');
  };

  render () {
    const { imgIndex } = this.state;
    const YouTubeParams = {
      height: '540',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    const tv = this.props.tv.data;
    const images = this.props.tv.images;
    const seasons = this.props.tv.sortSeasons;
    const bgImages = this.props.tv.bgImages;

    const overview = this.props.EngData.tv[tv.id] ? this.props.EngData.tv[tv.id].overview : tv.overview;
    const title = this.props.EngData.tv[tv.id] ? this.props.EngData.tv[tv.id].name !== this.props.tv.tvTitles.title ? this.props.EngData.tv[tv.id].name : this.props.tv.tvTitles.title : this.props.tv.tvTitles.title;
    return (
      <div className='movie'>
        <ServiceBlock isLoading={this.props.tv.isFetching} isSuccessful={this.props.tv.status} fetch={this.sendRequest}>
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

          <div className='container'>
            <div className='info-wrapper'>

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
                production_companies={tv.production_companies}
              />

              <div className='overview'>
                {this.props.tv.tvTitles.seasonTitle !== null
                  ? <div className='prev-page-link'>
                    <Link
                      to={this.props.match.url}
                      onClick={this.props.clearTvSeason}
                      className='link-angle link-angle--left'
                    >
                      <i className='fa fa-angle-left' aria-hidden='true' />
                      <span>На страницу сериала</span>
                    </Link>
                  </div>
                  : null}

                <div className='description'>
                  <MovieDescription
                    id={tv.id}
                    overview={tv.overview}
                    fetchEngData={this.handlerOnFetchEngData}
                    typeItem='movie'
                  />

                </div>
                {tv.videos.results.length > 0 ? <TVvideos videos={this.props.tv.tvVideos} onClick={this.showTrailerModal} /> : null}
                {this.props.tv.tvCredits.cast.length > 0 ? <MediaCast cast={this.props.tv.tvCredits.cast} /> : null}
                <Route path={`${this.props.match.url}/season-:season_number`} component={TVSeason} />

                {images.length > 0 ? <MediaStills images={images} title='Кадры из сериала' imgCount={16} onClickImg={this.onClickImg} /> : null}

              </div>
            </div>
          </div>

          {tv.similar.total_results > 0 ? <MediaRecommendations recommendations={tv.similar} listName='Похожие сериалы' typeList='tv' /> : null}
          {tv.seasons.length > 0 ? <TVseasons images={images} seasons={seasons} url={this.props.match.url} location={this.props.location.pathname} /> : null}
          {tv.recommendations.total_results > 0 ? <MediaRecommendations recommendations={tv.recommendations} listName='Вам может понравиться' typeList='tv' /> : null}

          {this.state.lightBox
            ? <Lightbox
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
              /> : null}

          {this.state.modalTrailer
            ? <div className='popup-base' onClick={this.closePopup}>
              <div className='popup popup--video'>
                <div className='popup__close' onClick={this.closePopup} />
                <Popup>
                  <YouTube
                    videoId={this.state.trailerKey}
                    opts={YouTubeParams}
                    onReady={this._onReady}
                  />
                </Popup>
              </div>
              </div> : null}
        </ServiceBlock>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    tv: state.TVs.TvData,
    EngData: state.General.engDescription
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadTvData: (id, lang) => dispatch(onLoadTV(id, lang)),
  clearTvData: () => dispatch(clearTvData()),
  clearTvSeason: () => dispatch(clearTvSeason())
});

export default connect(mapStateToProps, mapDispatchToProps)(TV);
