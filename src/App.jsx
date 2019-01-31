import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Routes from './Routes/Routes';

import './../styles/main.sass';
import Header from './Templates/Head/Head';
import Nav from './Templates/Nav/nav';
import { onGeneres } from './Data/api/General.api';


class App extends Component {
    componentDidMount() {
        JSON.parse(localStorage.getItem('genres'))
            ? null
            : this.props.Genres();
    }
    render() {
        return (
            <div>
	            <Helmet>
		            <title>Movie Base</title>
	            </Helmet>

                <Nav location={this.props.location}/>
                <Header history={this.props.history}/>

	            <Routes/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    Genres: () => dispatch(onGeneres())
});

export default withRouter(connect(null, mapDispatchToProps)(App));
