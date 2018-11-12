import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Collapse} from 'react-collapse';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MovieCollapse: true,
            TVCollapse: false
        };
    }
	componentDidUpdate(prevProps) {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(width < 1130){
            if (this.props.location.pathname !== prevProps.location.pathname) {
                document.querySelector('.nav').classList.remove('nav--mobile-show');
                document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
            }
        }
    }

    componentDidMount() {
        if (this.props.location.pathname.search(/movie/) === 1) {
	       this.setState({
		       MovieCollapse: true,
		       TVCollapse: false
	       });
        } else if (this.props.location.pathname.search(/tv/) === 1) {
	       this.setState({
		       MovieCollapse: false,
		       TVCollapse: true
	       });
        }
    }

     collapseNav = (e) => {
         let target = e.target;
         if (target.name === 'MovieCollapse') {
	        this.setState({
		        MovieCollapse: target.checked,
		        TVCollapse: false
	        });
         } else {
	        this.setState({
		        TVCollapse: target.checked,
		        MovieCollapse: false
	        });
         }
     };

    onClickLink = (e) => {
        e.target.closest('.nav').classList.remove('nav--mobile-show');
        document.querySelector('.mobile-nav-trigger').classList.remove('mobile-nav-trigger--isClicked');
    };


    render() {
        return (
            <div className="nav">
                <ul className="sidebar-menu sm-bordered sm-icons-block sm-icons-right">
                    <li className={`hasSubmenu active ${this.state.MovieCollapse ? 'hasSubmenu--open' : ''}`}>
                        <div className="nav__element hasSubmenu-trigger js--submenuTrigger movie-collapse-trigger" >
                            <span>Фильмы</span>
                            <i className="fa fa-film"/>
                            <input name="MovieCollapse" type="checkbox" onChange={this.collapseNav} checked={this.state.MovieCollapse}/>
                        </div>
                        <Collapse isOpened={this.state.MovieCollapse}>
                            <ul className="sub-menu">
                                <li className="sub-menu__item">
                                    <NavLink to="/movies/all"  activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Все фильмы</span>
                                        <i className="fa fa-fire" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                                <li className="sub-menu__item">
                                    <NavLink to="/movies/upcoming"  activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Ожидаемые фильмы</span>
                                        <i className="fa fa-calendar" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                                <li className="sub-menu__item">
                                    <NavLink to="/movies/playing"  activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Фильмы в кино</span>
                                        <i className="fa fa-ticket" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className={`hasSubmenu active ${this.state.TVCollapse ? 'hasSubmenu--open' : ''}`}>
                        <div className="nav__element hasSubmenu-trigger js--submenuTrigger tv-collapse-trigger">
                            <span>Сериалы</span>
                            <i className="fa fa-television"/>
                            <input name="TVCollapse" type="checkbox" onChange={this.collapseNav} checked={this.state.TVCollapse}/>
                        </div>
                        <Collapse isOpened={this.state.TVCollapse}>
                            <ul className="sub-menu">
                                <li className="sub-menu__item">
                                    <NavLink to="/tv/all" activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Все сериалы</span>
                                        <i className="fa fa-fire" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                                <li className="sub-menu__item">
                                    <NavLink to="/tv/airing" activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Сериалы на тв</span>
                                        <i className="fa fa-calendar" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                                <li className="sub-menu__item">
                                    <NavLink to="/tv/onAir" activeClassName="sub-menu__item--active" onClick={this.onClickLink}>
                                        <span>Текущие сериалы</span>
                                        <i className="fa fa-play-circle-o" aria-hidden="true"/>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                </ul>
            </div>
        );
    }
}
