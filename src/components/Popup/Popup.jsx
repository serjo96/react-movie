import React, {Component} from 'react';
import '../../../styles/popup/popup.sass';

class Popup extends Component {
    componentDidMount() {
	    setTimeout(()=>  this.showModal(), 500);
    }

	showModal = (e)=>{
		document.querySelector('.popup__content').classList.remove('popup--is-hide');
	}

 render() {
     return (
         <div className="popup__content popup--is-hide" >
             {this.props.children}
         </div>
     );
 }
}




export default  (Popup);
