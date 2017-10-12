import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router-dom';
import Header from '../containers/head/Head';
import Post from '../components/Move/Movie';

import PostCreate from '../containers/PostCreate/PostCreate';

class routes extends Component {
    render() {
        return (
            <Route path='/' component={Header}>
                <IndexRoute component={PostCreate}/>
                <Route path='postForm' component={PostCreate}>
                    <Route path="post" component={Post}/>
                </Route>
            </Route>
        )
    }
}

export default routes
