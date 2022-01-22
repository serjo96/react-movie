import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect, MapDispatchToProps } from 'react-redux';
import Routes from './Routes/Routes';

import './../styles/main.sass';
import Header from './templates/Head/Head';
import Nav from './templates/Nav/nav';
import { getGenresList } from '~/store/api/general.api';

interface DispatchProps {
    getGenresList: typeof getGenresList;
}
type Props = DispatchProps & RouteComponentProps

class App extends Component<Props> {
  componentDidMount () {
    JSON.parse(localStorage.getItem('genres')) && this.props.getGenresList();
  }

  render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>Movie Base</title>
        </Helmet>
        <React.StrictMode>
          <Nav location={this.props.location} />
          <Header history={this.props.history} />
          <Routes />
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  getGenresList
};

export default withRouter(connect(null, mapDispatchToProps)(App));
