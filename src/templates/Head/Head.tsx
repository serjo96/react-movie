import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/SearchHeader';

interface MyState {
  previousTop: 0
}

type MyProps = {
  history: History
}

export default class Header extends Component {
  state = {
    previousTop: 0
  };

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
    document.querySelector('.mobile-nav-trigger').addEventListener('click', this.toggleMobileNav);
    document.querySelector('.search-mobile-trigger').addEventListener('click', this.toggleMobileSearch);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentTop = window.pageYOffset;
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    if (currentTop > this.state.previousTop) {
      header.classList.add('header--is-hide');
      nav.classList.add('nav--full');
      // if scrolling up...
      // add class 'is-visible' to the main navigation
      // if currentTop == 0, remove 'is-fixed' and 'is-visible' classes
    } else {
      header.classList.remove('header--is-hide');
      nav.classList.remove('nav--full');
    }
    this.setState({ previousTop: currentTop });
  };

  toggleMobileNav = (e) => {
    const trigger = document.querySelector('.mobile-nav-trigger');
    const nav = document.querySelector('.nav');
    trigger.classList.toggle('mobile-nav-trigger--isClicked');
    nav.classList.toggle('nav--mobile-show');
  };

  toggleMobileSearch = () => {
    const trigger = document.querySelector('.search-mobile-trigger');
    const search = document.querySelector('.header__search');
    trigger.classList.toggle('search-mobile-trigger--isClicked');
    search.classList.toggle('header__search--mobile');
  };

  render () {
    return (
      <div className='header'>
        <div className='mobile-nav-trigger'>
          <span />
        </div>
        <div className='logo'>
          <Link to='/' className='logo__link link'>
            Movie Base
          </Link>
        </div>
        <div className='search-mobile-trigger link'>
          <i className='fa fa-search' aria-hidden='true' />
        </div>
        <Search history={this.props.history} />
      </div>
    );
  }
}
