import React, { Component } from 'react';
import '../../../styles/popup/popup.sass';

class Popup extends Component {
  componentDidMount () {
    setTimeout(() => this.showModal(), 500);
  }

    showModal = () => document.querySelector('.popup__content').classList.remove('popup--is-hide');

    render () {
      return (
        <div className='popup-base' onClick={this.props.closePopup}>
          <div className='popup'>
            {this.props.title ? <h3 className='popup__title'>{this.props.title}</h3> : null}
            <div className='popup__content popup--is-hide'>
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
}

export default (Popup);
