import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from './Routes/Routes';

import Header from './templates/head/head';
import { useAppDispatch } from '~/hooks/storeHooks';
import { getGenres } from '~/store/genres/generes.api';
import './../styles/main.sass';
import useTranslations from '~/hooks/useTranslations';
import { usePrevious } from '~/hooks/usePrevious';

function App () {
  const appDispatch = useAppDispatch();
  const { lang } = useTranslations();
  const prevLang = usePrevious(lang);

  const genresInLocalStorage = Boolean(JSON.parse(localStorage.getItem('genres')));
  useEffect(() => {
    if (!genresInLocalStorage || lang !== prevLang) {
      appDispatch(getGenres());
    }
  }, [lang]);
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
