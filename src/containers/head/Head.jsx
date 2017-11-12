import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/Search';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			previousTop: 0
		};
		this.el = null;
	}


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
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

 render() {
     return (
         <div className="header">
             <div className="logo">
                 <Link to="/" className="logo__link">
                     <div className="logo__img"/>
                 </Link>
             </div>
             <Search/>
         </div>
     );
 }
}
