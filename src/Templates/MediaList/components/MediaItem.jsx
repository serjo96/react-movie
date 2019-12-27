import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classNames';
import { urlRusLat } from 'utils';
import NoImg from 'images/NoImg.png';
import MovieInfo from '../../Tooltip/MovieInfo';
import Spinner from './../../Spinner/Spinner';

class MediaItem extends Component {
  state = {
    popup: false,
    imgStatus: true
  };

  el = null;

  handleOutItem = () => {
    if (this.props.typeList !== 'person') {
      this.setState({
        popup: true
      });
    }
  };

  handleLeaveItem = () => {
    this.setState({
      popup: false
    });
  };

  onLoadImg = (e) => {
    e.target.classList.remove('img-loading');
    this.setState({ imgStatus: false });
  };

  render () {
    const { popup } = this.state;
    const { id, title, typeList } = this.props;
    const parentClass = classNames('movie-item', {
      'movie-loading': this.state.imgStatus,
      'movie-item--hover': popup
    });

    return (
      <div
        className={parentClass}
        id={id}
        onMouseEnter={this.handleOutItem}
        onMouseLeave={this.handleLeaveItem}
        ref={el => {
          this.el = el;
        }}
      >
        <div className='movie-item__data'>
          <Link to={`/${typeList}/${urlRusLat(title)}-${id}`}>
            <div className='movie-item__poster'>
              <img
                className='img-loading'
                onLoad={this.onLoadImg}
                src={this.props.poster
                  ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.props.poster
                  : NoImg}
                alt={title}
              />
              {this.state.imgStatus && <Spinner />}
            </div>
            <div className='movie-item__title'>{title}</div>
            {this.props.job && <div className='movie-item__crew'>{this.props.job}</div>}
          </Link>
        </div>
        {this.state.popup && <MovieInfo
          title={this.props.title}
          originalTitle={this.props.original_title}
          date={this.props.date}
          overview={this.props.overview}
          voteAverage={this.props.voteAverage}
          el={this.el}
          typeItem={typeList}
          genres={this.props.genres}
          id={id}
        />}
      </div>
    );
  }
}

MediaItem.propTypes = {
  title: PropTypes.string,
  original_title: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number.isRequired,
  poster: PropTypes.string,
  voteAverage: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.string,
  typeList: PropTypes.string.isRequired
};

export default MediaItem;
