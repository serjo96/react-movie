import React, { useEffect, useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';

import Nav from '~/templates/Nav/nav';
import SearchHeader from '~/templates/Search/search-header';
import LanguageSwitcher from '~/ui-components/language-switcher/language-switcher';

import { usePrevious } from '~/hooks/usePrevious';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import useWindowScroll from '~/hooks/useWindowScroll';
import './header.sass';

export default function Header () {
  const { pathname } = useLocation();
  const { active } = useBreakpoints();
  const { y } = useWindowScroll();
  const [isShowNav, setShowNav] = useState(false);
  const [isShowMobileSearch, setIsShowMobileSearch] = useState(false);
  const [isHideHeader, setIsHideHeader] = useState(false);
  const prevPath = usePrevious(pathname);
  const prevPosition = usePrevious(y);
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS, BreakpointsNames.LG, BreakpointsNames.XL];

  const isSearchPage = useRouteMatch({
    path: '/search',
    exact: false,
    strict: false
  });

  useEffect(() => {
    if (pathname !== prevPath && (mobileBreakpoints.includes(active))) {
      setShowNav(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (y > 0 && y > prevPosition) {
      setIsHideHeader(true);
    } else {
      setIsHideHeader(false);
    }
  }, [y]);

  const toggleMobileNav = () => {
    setShowNav(!isShowNav);
  };

  const toggleMobileSearch = () => {
    setIsShowMobileSearch(!isShowMobileSearch);
  };

  const navTriggerClass = classNames('mobile-nav-trigger', {
    'mobile-nav-trigger--isClicked': isShowNav
  });

  const headerClass = classNames('header', {
    'header--is-hide': isHideHeader
  });

  return (
    <React.Fragment>
      <header className={headerClass}>
        <div
          className={navTriggerClass}
          onClick={toggleMobileNav}
        >
          <span />
        </div>
        <div className='logo'>
          <Link to='/' className='logo__link link'>
              Movie Base
          </Link>
        </div>

        <div className='header__right-side'>
          <div
            className='search-mobile-trigger link'
            onClick={toggleMobileSearch}
          >
            <i className='fa fa-search' aria-hidden='true' />
          </div>
          {!isSearchPage && <SearchHeader isShowMobileSearch={isShowMobileSearch} />}
          <LanguageSwitcher />
        </div>
      </header>

      <Nav
        isShowNav={isShowNav}
        isHideHeader={isHideHeader}
      />
    </React.Fragment>
  );
}
