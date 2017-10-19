import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MoviePopup extends Component   {
    constructor(props) {
        super(props);
        this.toltip = null;
    }
    componentDidMount() {
        let target = this.props.el,
            targetParent = target.parentNode,
            coords = target.getBoundingClientRect(),
            tooltipElem = this.toltip,
		    left = coords.left + target.offsetWidth,
            top = target.offsetTop;

        if (left < 0) {
            left =  0;
        }

        if ( coords.left > targetParent.offsetWidth - 30 - target.offsetWidth - tooltipElem.offsetWidth ) {
            left = target.offsetLeft - tooltipElem.offsetWidth ;
	        tooltipElem.classList.add('movie-popup--right');
	        tooltipElem.classList.remove('movie-popup--left');
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    }
    render() {
        return (
            <div className="movie-popup movie-popup--left popup" ref={el=> this.toltip = el}>
                <div className="popup__content">
                    <div className="popup__title">
                        <div className="ru-title">{this.props.title}</div>
                        <div className="original-title">{this.props.originalTitle}</div>
                    </div>
                    <div className="movie-popup__info">
                        <div className="rating">Рейтинг фильма {this.props.data.vote_average === 0 ? '-' : this.props.data.vote_average}</div>
                        <div className="time" />
                    </div>
                    <div className="movie-popup__description">{this.props.data.overview.length > 475 ? this.props.data.overview.substring(0, 475) + '...' : this.props.data.overview}</div>
                </div>
            </div>
        );
    }
}
export default MoviePopup;
