import React, { Component } from 'react';

import NoImg from '~/assets/images/NoImg.png';
import { imgUrl } from '~/config';
import Spinner from '~/ui-components/spinner/Spinner';

export default class Image extends Component {
  get imageSrc () {
    return this.props.src ? `${imgUrl}${this.props.src}` : NoImg;
  }

  render () {
    const { alt = '' } = this.props;
    return (
      <div className='image-wrapper'>
        {/*<Spinner />*/}
        <img src={this.imageSrc} alt={alt} />
      </div>
    );
  }
}
