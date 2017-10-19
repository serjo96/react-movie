import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <Link to='/' className="logo__link">
                        <div className="logo__img"/>
                    </Link>
                </div>
                <Search/>
            </div>
        );
    }
}
