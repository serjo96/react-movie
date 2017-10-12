import React, {Component} from 'react';


export default class Header extends Component {
    render() {
        return(
            <div className="header">
                <div className="logo">
                    <a href="/" className='logo__link'>
                        <div className="logo__img"/>
                    </a>
                </div>
                <input type="text" placeholder='Поиск фильмов и сериалов...'/>
            </div>
        )
    }
}
