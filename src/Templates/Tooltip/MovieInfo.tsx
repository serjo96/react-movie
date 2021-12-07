import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { onLoadEngMedia } from 'store/api/General.api';
import Portal from '~/ui-components/portal/portal';
import MovieDescription from '@ui/MovieDescription/MovieDescription';
import { urlRusLat } from '~/utils/format';

class MoviePopup extends Component {
  tooltip = null;
  parentRef = null;
  EngDataStatus = true;
  state = { show: false };

  componentDidMount () {
    this.initTooltipPosition();
  }

  componentDidUpdate () {
    this.initTooltipPosition();
  }

  initTooltipPosition = () => {
    if (!this.state.show) {
      return;
    }
    const target = this.parentRef;
    const tooltipPadding = 30;
    const parentCoords = target.getBoundingClientRect();
    const tooltipElem = this.tooltip;
    let left = target.offsetLeft + target.offsetWidth;
    const top = target.offsetTop + 50;

    if (left < 0) {
      left = 0;
    }
    if (parentCoords.left > window.innerWidth - tooltipPadding - target.offsetWidth - tooltipElem.offsetWidth) {
      left = target.offsetLeft - tooltipElem.offsetWidth;
      tooltipElem.classList.add('movie-tooltip--right');
      tooltipElem.classList.remove('movie-tooltip--left');
    }

    tooltipElem.classList.remove('show-tooltip');
    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
  };

  handleEnterItem = () => {
    if (this.props.typeList === 'person') {
      return;
    }
    if (this.props.handlerHover) {
      this.props.handlerHover(true);
    }
    this.setState({
      show: true
    });
  };

  handleLeaveItem = () => {
    if (this.props.handlerHover) {
      this.props.handlerHover(false);
    }
    this.setState({
      show: false
    });
  };

  get getMovieDate () {
    if (!this.props.date) {
      return null;
    }
    return <div className='tooltip__date'>{this.props.date.substring(0, 4)}</div>;
  }

  handlerOnFetchEngData = () => {
    this.props.fetchEngData(this.props.id, this.props.typeItem);
  };

  genreLink = (genreID) => {
    return `/${this.props.typeItem === 'movie'
      ? this.props.typeItem + 's'
      : this.props.typeItem}/all?genre-${urlRusLat(this.props.Allgenres.data.obj[genreID])}-${genreID}`;
  };

  renderGenres = (id, index) => {
    if (index >= 2) {
      return null;
    }
    return (
      <div key={id} className='genre'>
        {this.props.Allgenres.data.obj[id] &&
          <Link
            className='tag'
            to={this.genreLink(id)}
          >
            {this.props.Allgenres.data.obj[id]}
          </Link>}
      </div>
    );
  };

  get getOverview () {
    const { engData, typeItem, id, overview } = this.props;
    return engData[typeItem][id] ? engData[typeItem][id].overview : overview;
  }

  render () {
    const {
      Allgenres,
      engData,
      id,
      genres,
      typeItem,
      children,
      className,
      title,
      voteAverage
    } = this.props;
    const { show } = this.state;

    const originalTitle = engData[this.props.typeItem][this.props.id]
      ? engData[this.props.typeItem][this.props.id].name
      : this.props.originalTitle;
    return (
      <div
        onMouseEnter={this.handleEnterItem}
        onMouseLeave={this.handleLeaveItem}
        ref={parentRef => {
          this.parentRef = parentRef;
        }}
        className={className}
      >
        <Fragment>
          {children}
        </Fragment>

        {show &&
          <Portal>
            <div
              className='movie-tooltip movie-tooltip--left tooltip tooltip--movie show-tooltip'
              onMouseEnter={this.handleEnterItem}
              onMouseLeave={this.handleLeaveItem}
              ref={tooltipRef => {
                this.tooltip = tooltipRef;
              }}
            >
              <div className='tooltip__content'>
                <div className='tooltip__title'>
                  <div className='ru-title'>{title}</div>
                  <div className='original-title'>{originalTitle !== title && originalTitle}</div>
                </div>
                <div className='movie-tooltip__info'>
                  <div className='tooltip__genre-data'>
                    {this.getMovieDate}

                    {genres && Allgenres.isFetching &&
                      <div className='genres'>
                        {genres.map((id, index) => this.renderGenres(id, index))}
                      </div>}

                  </div>
                  <div className='rating'>Рейтинг {voteAverage} из 10</div>
                </div>
                <MovieDescription
                  short
                  overview={this.getOverview}
                  fetchEngData={this.handlerOnFetchEngData}
                  id={id}
                  typeItem={typeItem}
                />
              </div>
            </div>
          </Portal>}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    Allgenres: state.General.Genres,
    engData: state.General.EngDescription
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchEngData: (id, lang) => dispatch(onLoadEngMedia(id, lang))
});

MoviePopup.propTypes = {
  title: PropTypes.string.isRequired,
  typeItem: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchEngData: PropTypes.func,
  handlerHover: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePopup);
