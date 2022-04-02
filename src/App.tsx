import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from './Routes/Routes';

import Header from './templates/head/head';
import { getGenres } from '~/store/genres/generes.api';

import { useAppDispatch } from '~/hooks/storeHooks';
import useTranslations from '~/hooks/useTranslations';
import { usePrevious } from '~/hooks/usePrevious';
import { useLangEffect } from '~/hooks/useLangEffect';

import './../styles/main.sass';

function App () {
  const appDispatch = useAppDispatch();
  const { lang } = useTranslations();
  const prevLang = usePrevious(lang);

  const genresInLocalStorage = Boolean(JSON.parse(localStorage.getItem('genres')));
  useLangEffect(() => {
    if (!genresInLocalStorage || lang !== prevLang) {
      appDispatch(getGenres());
    }
  }, []);
  // TODO: Add title component, with generation title
  return (
    <React.Fragment>
      <Helmet>
        <title>Movie Base</title>
      </Helmet>
      <React.StrictMode>
        <Header />
        <Routes />
      </React.StrictMode>
    </React.Fragment>
  );
}

export default withRouter(App);
