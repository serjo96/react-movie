import React, { Component } from 'react';
import {  Route, Switch, withRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import '../styles/main.sass';
import Header from './containers/head/Head';
import Nav from './components/Nav/nav';
import Main from './containers/main/Main';
import Movie from './components/Move/Movie';
import TV from './components/TV/Tv';

class App extends Component {
    render() {
        return (
            <div>
	            <Helmet>
		            <title>Movie-search</title>
	            </Helmet>
                <Nav/>
                <Header/>

	            <Switch>
		            <Route exact path="/" component={Main} />
		            <Route exact path="/movie/:urlRusLat" component={Movie} />
		            <Route exact path="/tv/:urlRusLat" component={TV} />
	            </Switch>
            </div>
        );
    }
}
export default withRouter(App);
