import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Search from '../../containers/search/SearchHeader';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			previousTop: 0
		};
	}


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
	    document.querySelector('.mobile-nav-trigger').addEventListener('click', this.toggleMobileNav);
	    document.querySelector('.search-mobile-trigger').addEventListener('click', this.toggleMobileSearch);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

	 handleScroll = () => {
	     let currentTop = window.pageYOffset,
	         header = document.querySelector('.header'),
		     nav = document.querySelector('.nav');
	     if (currentTop > this.state.previousTop) {
		     header.classList.add('header--is-hide');
		     nav.classList.add('nav--full');
	         // if scrolling up...
	         // add class 'is-visible' to the main navigation
	         // if currentTop == 0, remove 'is-fixed' and 'is-visible' classes
	     } else {
		     header.classList.remove('header--is-hide');
		     nav.classList.remove('nav--full');
	     }
	     this.setState({previousTop: currentTop});
	 };

	toggleMobileNav = (e) =>{
		let trigger = document.querySelector('.mobile-nav-trigger'),
			nav = document.querySelector('.nav');
		trigger.classList.toggle('mobile-nav-trigger--isClicked');
		nav.classList.toggle('nav--mobile-show');
	};

	toggleMobileSearch = () =>{
		let trigger = document.querySelector('.search-mobile-trigger'),
			search = document.querySelector('.header__search');
		trigger.classList.toggle('search-mobile-trigger--isClicked');
		search.classList.toggle('header__search--mobile');
	};


	 render() {
	     return (
	         <div className="header">
		         <div className="mobile-nav-trigger">
			         <span/>
		         </div>
	             <div className="logo">
	                 <Link to="/" className="logo__link link">
	                     Movie Base
	                 </Link>
	             </div>
		         <div className="search-mobile-trigger link">
			         <i className="fa fa-search" aria-hidden="true"/>
		         </div>
	             <Search history={this.props.history}/>
	         </div>
	     );
	 }
}
