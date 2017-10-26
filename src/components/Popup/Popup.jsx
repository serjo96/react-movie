import React, {Component} from 'react';

class Popup extends Component {
    componentDidMount() {
	    this.props.videoStatus? this.showModal() : null;
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
