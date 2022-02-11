import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usePrevious } from '~/hooks/usePrevious';
import { moviesLinks, serialsLinks } from '~/utils/navLinks';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import { setShowNav } from '~/store/general/general.slice';
import './nav.sass';

export default function Nav () {
  const appDispatch = useAppDispatch();
  const { isShowNav } = useAppSelector(state => state.general);

  const { pathname } = useLocation();
  const prevPath = usePrevious(pathname);
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

  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS, BreakpointsNames.LG, BreakpointsNames.XL];
  const { active } = useBreakpoints();

  useEffect(() => {
    setNavCollapse(!!isMoviesPage || !!isMoviePage);
  }, []);

  useEffect(() => {
    if (pathname !== prevPath && (mobileBreakpoints.includes(active))) {
      appDispatch(setShowNav(false));
    }
  }, [pathname]);

  const handleCollapseNav = () => {
    setNavCollapse(!navCollapse);
  };

  const subMenuClass = (isCollapse: boolean) => classNames('sub-menu', {
    'sub-menu--open': isCollapse
  });

  const navClass = classNames('nav', {
    'nav--show': isShowNav
  });

  return (
    <nav className={navClass}>
      <ul className='sidebar-menu'>
        <li className={subMenuClass(navCollapse)}>
          <div
            className='nav__element sub-menu-trigger'
            onClick={handleCollapseNav}
          >
            <span>Фильмы</span>
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
                    <span>{link.title}</span>
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
            <span>Сериалы</span>
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
                    <span>{link.title}</span>
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
