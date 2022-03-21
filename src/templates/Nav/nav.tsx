import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { moviesLinks, serialsLinks } from '~/utils/navLinks';
import './nav.sass';

interface MyProps {
  isShowNav: boolean;
  isHideHeader: boolean;
}

export default function Nav ({
  isShowNav,
  isHideHeader
}: MyProps) {
  const { t } = useTranslation();
  const [navCollapse, setNavCollapse] = useState(true);
  const isMoviesPage = useRouteMatch({
    path: '/movies/',
    exact: false,
    strict: false
  });

  const isMoviePage = useRouteMatch({
    path: '/movie/',
    exact: false,
    strict: false
  });

  const { pathname } = useLocation();
  const isCollapseMovie = pathname === '/' || !!isMoviesPage || !!isMoviePage;

  useEffect(() => {
    setNavCollapse(isCollapseMovie);
  }, []);

  const handleCollapseNav = () => {
    setNavCollapse(!navCollapse);
  };

  const subMenuClass = (isCollapse: boolean) => classNames('sub-menu', {
    'sub-menu--open': isCollapse
  });

  const navClass = classNames('nav', {
    'nav--show': isShowNav,
    'nav--full': isHideHeader
  });

  return (
    <nav className={navClass}>
      <ul className='sidebar-menu'>
        <li className={subMenuClass(navCollapse)}>
          <div
            className='nav__element sub-menu-trigger'
            onClick={handleCollapseNav}
          >
            <span>{t('nav.movies.sectionTitle')}</span>
            <i className='fa fa-film' />
          </div>
          <Collapse
            theme={{ collapse: 'nav-collapse' }}
            isOpened={navCollapse}
          >
            <ul className='sub-menu'>
              {moviesLinks().map((link, index) => (
                <li className='sub-menu__item' key={index}>
                  <NavLink
                    to={link.href}
                    activeClassName='sub-menu__item--active'
                  >
                    <span>{t(`nav.movies.${link.keyTitle}`)}</span>
                    <i className={`fa ${link.icon}`} aria-hidden='true' />
                  </NavLink>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>

        <li className={subMenuClass(!navCollapse)}>
          <div
            className='nav__element sub-menu-trigger'
            onClick={handleCollapseNav}
          >
            <span>{t('nav.tvShows.sectionTitle')}</span>
            <i className='fa fa-television' />
          </div>
          <Collapse
            theme={{ collapse: 'nav-collapse' }}
            isOpened={!navCollapse}
          >
            <ul className='sub-menu'>
              {serialsLinks().map((link, index) => (
                <li className='sub-menu__item' key={index}>
                  <NavLink
                    to={link.href}
                    activeClassName='sub-menu__item--active'
                  >
                    <span>{t(`nav.tvShows.${link.keyTitle}`)}</span>
                    <i className={`fa ${link.icon}`} aria-hidden='true' />
                  </NavLink>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
      </ul>
    </nav>
  );
}
