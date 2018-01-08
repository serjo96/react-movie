import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { urlRusLat } from '../../utils/utils';
import { onLoadEngMedia } from '../../actions/general-actions';

class MoviePopup extends Component   {
    constructor(props) {
        super(props);
        this.tooltip = null;
        this.EngDataStatus = true;
    }


    componentDidMount() {
        let target = this.props.el,
            targetParent = target.closest('.tooltip-parent'),
            coords = target.getBoundingClientRect(),
            tooltipElem = this.tooltip,
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
        let {Allgenres} = this.props,
	        overview = this.props.EngData[this.props.typeItem][this.props.id] ? this.props.EngData[this.props.typeItem][this.props.id].overview : this.props.overview,
            Originaltitle = this.props.EngData[this.props.typeItem][this.props.id] ?  this.props.EngData[this.props.typeItem][this.props.id].name : this.props.originalTitle;
        return (
            <div className="movie-tooltip movie-tooltip--left tooltip tooltip--movie show-tooltip" ref={el=> this.tooltip = el}>
                <div className="tooltip__content">
                    <div className="tooltip__title">
                        <div className="ru-title">{this.props.title}</div>
                        <div className="original-title">{Originaltitle !== this.props.title ? Originaltitle: null}</div>
                    </div>
                    <div className="movie-tooltip__info">
                        <div className="tooltip__genre-data">
                            {this.props.date ? <div className="tooltip__date">{this.props.date.substring(0, 4)}</div>: null}
                            {this.props.genres? Allgenres.isFetching ?
                                <div className='genres'>{this.props.genres.map((el, indx)=> indx<= 2 ?
                                    <div key={indx} className="genre">
                                        {Allgenres.data.obj[el] ? <Link className='tag' to={`/${this.props.typeItem === 'movie' ? this.props.typeItem + 's' : this.props.typeItem}/all?genre-${urlRusLat(Allgenres.data.obj[el])}-${el}`}>{Allgenres.data.obj[el]}</Link> : null}
                                    </div>  : null) }
                                    </div> :null :null}
                        </div>
                        <div className="rating">Рейтинг {this.props.voteAverage} из 10</div>
                    </div>
	                {overview && overview !== 404?
                        <p className="movie-tooltip__description">{overview.length > 475 ? overview.substring(0, 475) + '...' : overview }</p>
                        :<div className="movie-tooltip__no-description">
			                <div>Ой! Кажется описание к этому произведению отсутствует</div>
                            {overview !== 404 ? <div className='load-description-eng'>
				                <span onClick={()=>this.props.loadEngData(this.props.id, this.props.typeItem)}>Загрузить описание на английском?</span>
			                </div>: null}
		                </div>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		Allgenres: state.General.Genres,
        EngData: state.General.EngDescription
	};
}


const mapDispatchToProps = (dispatch) => ({
	loadEngData: (id, lang) => dispatch(onLoadEngMedia(id, lang))
});

export default connect(mapStateToProps, mapDispatchToProps) (MoviePopup);
