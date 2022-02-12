import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Nav from '~/templates/Nav/nav';
import SearchHeader from '~/templates/Search/search-header';
import './header.sass';
import { usePrevious } from '~/hooks/usePrevious';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import useWindowScroll from '~/hooks/useWindowScroll';
import {useToggle} from "~/hooks/useToggle";

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

  useEffect(() => {
    if (pathname !== prevPath && (mobileBreakpoints.includes(active))) {
      setShowNav(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (y > prevPosition) {
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
        <div
          className='search-mobile-trigger link'
          onClick={toggleMobileSearch}
        >
          <i className='fa fa-search' aria-hidden='true' />
        </div>
        <SearchHeader isShowMobileSearch={isShowMobileSearch} />
      </header>

      <Nav
        isShowNav={isShowNav}
        isHideHeader={isHideHeader}
      />
    </React.Fragment>
  );
}
