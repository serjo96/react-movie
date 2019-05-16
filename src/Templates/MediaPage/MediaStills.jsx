import React, { Component } from 'react';
import Lightbox from 'lightbox-react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

export default class MediaStills extends Component {
    state = {
      imgCount: this.props.imgCount ? this.props.imgCount - 1 : 15,
      imgStatus: true,
      lightBox: false,
      imgIndex: 0,
    };

    loadMoreImg = (e) => {
	    this.setState({ imgCount: this.state.imgCount += this.props.imgCount  });
	    e.target.closest('.stills__list').classList.add('stills__list--moreLoaded');
    };

    onLoadImg = (e) => {
      e.target.classList.remove('img-loading');
      this.setState({ imgStatus: false });
    };

  onClickImg = (e) => {
    this.setState({
      imgIndex: e.target.dataset.index,
      lightBox: !this.state.lightBox
    });
  };

  render () {
    const { images, posters, title } = this.props;
    const { imgIndex, imgCount, imgStatus, lightBox } = this.state;

    if (!images.length) {
      return null;
    }
      return (
        <div>
          <div className='stills'>
            <h2>{title}</h2>
            <div className={`stills__list ${images.length <= imgCount + 1 ? 'stills__list--moreLoaded' : ''} ${title === 'Фото' ? 'stills__list--person' : ''}`}>
              {images.length > imgCount + 1
                ? <div className='show-more show-more--stills'>
                  <div className='show-more__btn' onClick={this.loadMoreImg}>Больше</div>
                </div> : null
              }
              {images.map((backdrop, indx) =>
                indx <= imgCount &&
                <div className={`stills__img ${posters && 'stills__img--posters'}`} key={indx}>
                  {imgStatus && <Spinner />}
                  <img src={'https://image.tmdb.org/t/p/w1280' + backdrop.file_path}
                       data-index={indx}
                       alt=''
                       className='img-loading'
                       onClick={this.onClickImg}
                       onLoad={this.onLoadImg}
                  />
                </div>
              )}
            </div>
          </div>

          {lightBox &&
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
            />}
        </div>

      );
    }
};


MediaStills.propTypes = {
  imgCount: PropTypes.number,
  title: PropTypes.string,
  posters: PropTypes.boolean,
  onClickImg: PropTypes.func,
};
