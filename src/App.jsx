import React, { Component } from 'react';
import {  Route, Switch, withRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import '../styles/main.sass';
import Header from './containers/head/Head';
import Nav from './components/Nav/nav';
import Routes from './Routes/Routes'


class App extends Component {
    render() {
        return (
            <div>
	            <Helmet>
		            <title>Movie-search</title>
	            </Helmet>
                <Nav location={this.props.location}/>
                <Header/>

	            <Routes/>
            </div>
        );
    }
}
export default withRouter(App);
