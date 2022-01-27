import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { Location } from 'history';
import classNames from 'classnames';

import { moviesLinks, serialsLinks } from '~/utils/navLinks';
import './nav.sass';

interface MyState {
  isMoviePage: boolean;
  movieCollapse: boolean;
}

type MyProps = {
  location: Location
}

export default class Nav extends Component<MyProps, MyState> {
  private navRef = React.createRef<HTMLDivElement>();

  state = {
    movieCollapse: true,
    isMoviePage: true
  };

  componentDidMount () {
    if (location.pathname !== '/') {
      const isMoviePages = /\/movies\//gi.test(location.pathname);
      this.setState({
        movieCollapse: isMoviePages,
        isMoviePage: isMoviePages
      });
    }
  }

  componentDidUpdate (prevProps: MyProps) {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const isChangedPath = this.props.location.pathname !== prevProps.location.pathname;

    if (width < 1130) {
      if (isChangedPath) {
        this.navRef.current.classList.remove('nav--mobile-show');
        document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
      }
    }
  }

  handleCollapseNav = () => {
    this.setState((state) => ({
      movieCollapse: !state.movieCollapse
    }));
  };

  handleClickLink = () => {
    this.navRef.current.classList.remove('nav--mobile-show');
    document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
  };

  render () {
    const movieSubMenuClass = classNames('sub-menu', {
      'sub-menu--open': this.state.movieCollapse
    });

    const tvSubMenuClass = classNames('sub-menu', {
      'sub-menu--open': !this.state.movieCollapse
    });

    return (
      <div className='nav' ref={this.navRef}>
        <ul className='sidebar-menu'>
          <li className={movieSubMenuClass}>
            <div
              className='nav__element sub-menu-trigger'
              onClick={this.handleCollapseNav}
            >
              <span>Фильмы</span>
              <i className='fa fa-film' />
            </div>
            <Collapse isOpened={this.state.movieCollapse}>
              <ul className='sub-menu'>
                {moviesLinks().map((link, index) => (
                  <li className='sub-menu__item' key={index}>
                    <NavLink
                      to={link.href}
                      activeClassName='sub-menu__item--active'
                      onClick={this.handleClickLink}
                    >
                      <span>{link.title}</span>
                      <i className={`fa ${link.icon}`} aria-hidden='true' />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Collapse>
          </li>

          <li className={tvSubMenuClass}>
            <div
              className='nav__element sub-menu-trigger'
              onClick={this.handleCollapseNav}
            >
              <span>Сериалы</span>
              <i className='fa fa-television' />
            </div>
            <Collapse isOpened={!this.state.movieCollapse}>
              <ul className='sub-menu'>
                {serialsLinks().map((link, index) => (
                  <li className='sub-menu__item' key={index}>
                    <NavLink
                      to={link.href}
                      activeClassName='sub-menu__item--active'
                      onClick={this.handleClickLink}
                    >
                      <span>{link.title}</span>
                      <i className={`fa ${link.icon}`} aria-hidden='true' />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Collapse>
          </li>
        </ul>
      </div>
    );
  }
}
