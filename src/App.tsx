import React, { Component, useEffect } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from './Routes/Routes';

import Header from './templates/Head/Head';
import Nav from './templates/Nav/nav';
import { useAppDispatch } from '~/hooks/storeHooks';
import { getGenres } from '~/store/genres/generes.api';
import './../styles/main.sass';

function App () {
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const genresInLocalStorage = Boolean(JSON.parse(localStorage.getItem('genres')));
  useEffect(() => {
    if (!genresInLocalStorage) {
      appDispatch(getGenres());
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Movie Base</title>
      </Helmet>
      <React.StrictMode>
        <Nav location={location} />
        <Header history={history} />
        <Routes />
      </React.StrictMode>
    </React.Fragment>
  );
}

export default withRouter(App);
