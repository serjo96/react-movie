import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect, MapDispatchToProps } from 'react-redux';
import Routes from './Routes/Routes';

import './../styles/main.sass';
import Header from './Templates/Head/Head';
import Nav from './Templates/Nav/nav';
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
      <div>
        <Helmet>
          <title>Movie Base</title>
        </Helmet>

        <Nav location={this.props.location} />
        <Header history={this.props.history} />

        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  getGenresList
};

export default withRouter(connect(null, mapDispatchToProps)(App));
