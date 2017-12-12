import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import '../styles/main.sass';
import Header from './containers/head/Head';
import Nav from './components/Nav/nav';
import Routes from './Routes/Routes';
import { connect } from 'react-redux';
import { onGeneres } from './actions/general-actions';


class App extends Component {
	componentDidMount() {
		this.props.Genres();

	}
    render() {
        return (
            <div>
	            <Helmet>
		            <title>Movie Base</title>
	            </Helmet>
                <Nav location={this.props.location}/>
                <Header/>

	            <Routes/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
	Genres: () => dispatch(onGeneres()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
