import React, { Component } from 'react';
import {  Route, Switch, withRouter } from 'react-router-dom';
import '../styles/index.scss';
import Header from './containers/head/Head';
import Nav from './containers/Nav/nav';

import Main from './containers/main/Main';
import Movie from './components/Move/Movie';

class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <Header/>
	            <Switch>
		            <Route exact path="/" component={Main} />
		            <Route exact path="/movie/:friendlyUrl" component={Movie} />
	            </Switch>
            </div>
        );
    }
}
export default withRouter(App);
