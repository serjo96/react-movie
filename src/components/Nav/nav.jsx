import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Collapse} from 'react-collapse';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCollapse: true,
            secondCollapse: false
        };
    }

	componentDidMount(){
      if(this.props.location.pathname.split('/')[1] === 'tv'){

      }
    };


     collapseNav = (e) => {
         e.target.closest('.hasSubmenu').classList.toggle('hasSubmenu--open');
         this.setState({[e.target.name]: e.target.checked});
     };



     render() {
         return (
             <div className="nav">
                 <ul className="sidebar-menu sm-bordered sm-icons-block sm-icons-right">
                     <li className="hasSubmenu active hasSubmenu--open" >
                         <div className="nav__element hasSubmenu-trigger js--submenuTrigger movie-collapse-trigger" >
                             <span>Фильмы</span>
                             <i className="fa fa-film"/>
                             <input name="firstCollapse" type="checkbox" onChange={e=> this.collapseNav(e)} checked={this.state.firstCollapse}/>
                         </div>
                         <Collapse isOpened={this.state.firstCollapse}>
                             <ul className="sub-menu">
                                 <li className="sub-menu__item">
                                     <NavLink to="/movies/upcoming"  activeClassName="sub-menu__item--active">
                                         <span>Ожидаемые фильмы</span>
                                         <i className="fa fa-calendar" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/movies/playing"  activeClassName="sub-menu__item--active">
                                         <span>Фильмы в кино</span>
                                         <i className="fa fa-ticket" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/movies/top"  activeClassName="sub-menu__item--active">
                                         <span>Топ фильмы</span>
                                         <i className="fa fa-arrow-up" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/movies/popular"  activeClassName="sub-menu__item--active">
                                         <span>Популярные фильмы</span>
                                         <i className="fa fa-fire" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                             </ul>
                         </Collapse>
                     </li>
                     <li className="hasSubmenu active">
                         <div className="nav__element hasSubmenu-trigger js--submenuTrigger">
                             <span>Сериалы</span>
                             <i className="fa fa-television"/>
                             <input name="secondCollapse" type="checkbox" onChange={e=> this.collapseNav(e)}/>
                         </div>
                         <Collapse isOpened={this.state.secondCollapse}>
                             <ul className="sub-menu">
                                 <li className="sub-menu__item">
                                     <NavLink to="/tv/airing" activeClassName="sub-menu__item--active">
                                         <span>Сериалы на тв</span>
                                         <i className="fa fa-calendar" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/tv/onAir" activeClassName="sub-menu__item--active">
                                         <span>Текущие сериалы</span>
                                         <i className="fa fa-play-circle-o" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/tv/top" activeClassName="sub-menu__item--active">
                                         <span>Топ сериалы</span>
                                         <i className="fa fa-arrow-up" aria-hidden="true"/>
                                     </NavLink>
                                 </li>
                                 <li className="sub-menu__item">
                                     <NavLink to="/tv/popular" activeClassName="sub-menu__item--active">
                                         <span>Популярные сериалы</span>
                                         <i className="fa fa-fire" aria-hidden="true"/>
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
