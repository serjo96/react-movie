import React, { Component } from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Collapse } from 'react-collapse';

interface MyState {
  movieCollapse: boolean;
  tvCollapse: boolean;
}

export default class Nav extends Component<RouteComponentProps, MyState> {
  state = {
    movieCollapse: true,
    tvCollapse: false
  };

  componentDidUpdate (prevProps: RouteComponentProps) {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width < 1130) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        document.querySelector('.nav').classList.remove('nav--mobile-show');
        document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
      }
    }
  }

  componentDidMount () {
    if (this.props.location.pathname.search(/movie/) === 1) {
      this.setState({
        movieCollapse: true,
        tvCollapse: false
      });
    } else if (this.props.location.pathname.search(/tv/) === 1) {
      this.setState({
        movieCollapse: false,
        tvCollapse: true
      });
    }
  }

  handleCollapseNav = (element) => {
    const target = element.target;
    if (target.name === 'movieCollapse') {
      this.setState({
        movieCollapse: target.checked,
        tvCollapse: false
      });
    } else {
      this.setState({
        tvCollapse: target.checked,
        movieCollapse: false
      });
    }
  };

  handleClickLink = (e) => {
    e.target.closest('.nav').classList.remove('nav--mobile-show');
    document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
  };

  render () {
    return (
      <div className='nav'>
        <ul className='sidebar-menu sm-bordered sm-icons-block sm-icons-right'>
          <li className={`hasSubmenu active ${this.state.movieCollapse ? 'hasSubmenu--open' : ''}`}>
            <div className='nav__element hasSubmenu-trigger js--submenuTrigger movie-collapse-trigger'>
              <span>Фильмы</span>
              <i className='fa fa-film' />
              <input
                name='movieCollapse'
                type='checkbox'
                onChange={this.handleCollapseNav}
                checked={this.state.movieCollapse}
              />
            </div>
            <Collapse isOpened={this.state.movieCollapse}>
              <ul className='sub-menu'>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/movies/all'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Все фильмы</span>
                    <i className='fa fa-fire' aria-hidden='true' />
                  </NavLink>
                </li>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/movies/upcoming'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Ожидаемые фильмы</span>
                    <i className='fa fa-calendar' aria-hidden='true' />
                  </NavLink>
                </li>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/movies/playing'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Фильмы в кино</span>
                    <i className='fa fa-ticket' aria-hidden='true' />
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>

          <li className={`hasSubmenu active ${this.state.tvCollapse ? 'hasSubmenu--open' : ''}`}>
            <div className='nav__element hasSubmenu-trigger js--submenuTrigger tv-collapse-trigger'>
              <span>Сериалы</span>
              <i className='fa fa-television' />
              <input
                name='tvCollapse'
                type='checkbox'
                onChange={this.handleCollapseNav}
                checked={this.state.tvCollapse}
              />
            </div>
            <Collapse isOpened={this.state.tvCollapse}>
              <ul className='sub-menu'>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/tv/all'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Все сериалы</span>
                    <i className='fa fa-fire' aria-hidden='true' />
                  </NavLink>
                </li>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/tv/airing'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Сериалы на тв</span>
                    <i className='fa fa-calendar' aria-hidden='true' />
                  </NavLink>
                </li>
                <li className='sub-menu__item'>
                  <NavLink
                    to='/tv/onAir'
                    activeClassName='sub-menu__item--active'
                    onClick={this.handleClickLink}
                  >
                    <span>Текущие сериалы</span>
                    <i className='fa fa-play-circle-o' aria-hidden='true' />
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </div>
    );
  }
}
