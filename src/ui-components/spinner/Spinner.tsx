import React, { Component } from 'react';
import './spinner.sass';

class Spinner extends Component {
  render () {
    return (

      <div className='spinner-wrap'>
        <div className='spinner' />
      </div>

    );
  }
}

export default (Spinner);
