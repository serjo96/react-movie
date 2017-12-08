import React, {Component} from 'react';
import  { ReactCSSTransitionGroup, CSSTransition }  from 'react-transition-group';

class Spinner extends Component {
    render() {
        return (

                <div className="spinner-wrap" >
                    <div className="spinner"/>
                </div>

        );
    }
}





export default (Spinner);
