import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { urlRusLat } from '../../utils/utils';

class MoviePopup extends Component   {
    constructor(props) {
        super(props);
        this.toltip = null;
    }
    componentDidMount() {
        let target = this.props.el,
            targetParent = target.closest('.tooltip-parent'),
            coords = target.getBoundingClientRect(),
            tooltipElem = this.toltip,
		    left = target.offsetLeft + target.offsetWidth,
            top = target.offsetTop;


        if (left < 0) {
            left =  0;
        }
        if ( coords.left > targetParent.offsetWidth - 30 - target.offsetWidth - tooltipElem.offsetWidth ) {
            left = target.offsetLeft - tooltipElem.offsetWidth ;
	        tooltipElem.classList.add('movie-tooltip--right');
	        tooltipElem.classList.remove('movie-tooltip--left');
        }

	    tooltipElem.classList.remove('show-tooltip');
        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    }
    render() {
        let {Allgenres} = this.props;
        return (
            <div className="movie-tooltip movie-tooltip--left tooltip tooltip--movie show-tooltip" ref={el=> this.toltip = el}>
                <div className="tooltip__content">
                    <div className="tooltip__title">
                        <div className="ru-title">{this.props.title}</div>
                        <div className="original-title">{this.props.originalTitle !== this.props.title ? this.props.originalTitle : null}</div>
                    </div>
                    <div className="movie-tooltip__info">
                        <div className="tooltip__genre-data">
                            {this.props.date ? <div className="tooltip__date">{this.props.date.substring(0, 4)}</div>: null}
                            {this.props.genres? Allgenres.isFetching ?
                                <div className='genres'>{this.props.genres.map((el, indx)=> indx<= 2 ?
                                    <div key={indx} className="genre">
                                        <Link className='tag' to={`/lists/genres_${this.props.typeItem}/${urlRusLat(Allgenres.data[el])}-${el}`}>{Allgenres.data[el]}</Link>
                                    </div>  : null) }
                                    </div> :null :null}
                        </div>
                        <div className="rating">Рейтинг {this.props.voteAverage} из 10</div>
                    </div>
                    <p className="movie-tooltip__description">{this.props.overview ? (this.props.overview.length > 475) ? this.props.overview.substring(0, 475) + '...' : this.props.overview : 'Ой! Кажется описание к этому произведению отсутствует'}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		Allgenres: state.General.Genres,
	};
}


export default connect(mapStateToProps) (MoviePopup);
