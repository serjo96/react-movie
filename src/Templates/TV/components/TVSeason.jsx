import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearTvSeason } from './../../../Data/actions/tv-actions';
import { onSeasonTV } from './../../../Data/api/Tv.api';

import { friendlyData, kFormatter, declOfNum } from './../../../utils/utils';
import NoImg from 'images/NoImg.png';

class TVSeason extends Component {
    state = {
      imgCount: 11
    };

    componentWillReceiveProps (nextProps) {
      if (nextProps.match.params.season_number !== this.props.match.params.season_number) {
        this.sendRequest(this.props.match.url, nextProps.match.params.season_number);
        window.scroll(0, 0);
      }
    }

    componentWillUnmount () {
      this.props.clearTvSeason();
    }

    componentDidMount () {
      window.scroll(0, 0);
      this.sendRequest();
    }

    sendRequest = (id = this.props.match.url, season = this.props.match.params.season_number) => {
      const tvUrl = id.split('-');
      const tvID = parseInt(tvUrl[1]);
      const tvSeason = parseInt(season);
      this.props.loadSeasonTv(tvID, tvSeason);
    };

    render () {
      const { season } = this.props;

      return (
        <div className='season'>
          {season.isFetching &&
          <div className='season__wrapper'>
            <div className='season__number-series'>{`${season.data.episodes.length} ${season.data.episodes.length > 1 ? 'серий' : 'серия'}`}</div>
            <div className='episodes-list'>
              {season.data.episodes.map((el, indx) => (
                <div className='episodes-list__episode episode' key={indx}>
                  <div className='episode__img' style={{ backgroundImage: `url(${el.still_path ? `https://image.tmdb.org/t/p/original${el.still_path})` : NoImg}` }} />
                  <div className='episode__data'>
                    <div className='episode__header'>
                      <div className='episode-header--left'>
                        <div className='episode__title'>
                          <div className='episode__number'>{`${el.season_number}x${el.episode_number}`}</div>
                          <div className='episode__name'> {el.name}</div>
                        </div>
                        <div className='episode__date'>{`Дата выхода ${el.air_date ? friendlyData(el.air_date) : '-'}`}</div>
                      </div>
                      <div className='episode-header--right'>
                        <div className='rating'>
                          <div className={'icon fa fa-heart rating-' + Math.ceil(el.vote_average)} />
                          <div className='vote-numbers'>
                            <div className='rating__vote-count'>{el.vote_average.toString().substring(0, 3)} из 10</div>
                            <div className='rating__count'>{kFormatter(el.vote_count)} {declOfNum(el.vote_count, ['голос', 'голоса', 'голосов'])}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='episode__overview-img-wrap'>
                      <div className='episode__img episode__img--mobile' style={{ backgroundImage: `url(${el.still_path ? `https://image.tmdb.org/t/p/original${el.still_path})` : NoImg}` }} />
                      <div className='episode__overview'>{el.overview ? el.overview : 'Описание к этой серии еще не добавлено.'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
        </div>

	   );
	 }
}

function mapStateToProps (state) {
  return {
    season: state.TVs.TvSeason
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadSeasonTv: (id, season) => dispatch(onSeasonTV(id, season)),
  clearTvSeason: () => dispatch(clearTvSeason())

});

export default connect(mapStateToProps, mapDispatchToProps)(TVSeason);
