import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {onSearch, clearSearch} from '../../actions/general-actions';
import { urlRusLat } from '../../utils/utils';
import NoImg from '../../img/NoImg.png';
import {DebounceInput} from 'react-debounce-input';
import Spinner from '../../components/Spinner/Spinner';

class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
	        visibilityResult: false,
	        val: '',
	        top: 0,
	        imgStatus: true
        };
    }

    componentDidMount() {
        window.addEventListener('click', this.pageClick, false);
    }

	 pageClick = (e) => {
	     if (this.mouseIsDownOnCalendar || e.target.className === 'search__field' || e.target.className === 'search-field-btn') {
	         return;
	     }

	     this.setState({
	         visibilityResult: false
	     });
	 };


	 mouseDownHandler = () => {
	     this.mouseIsDownOnCalendar = true;
	 };

	 mouseUpHandler =() => {
	     this.mouseIsDownOnCalendar = false;
	 };


	 onInput = (e) => {
	     this.setState({val: e.target.value});
	     if(this.state.val.length >0){
	        this.setState({visibilityResult: true});
	        this.props.onInput(this.state.val);
	     }
	 };


	 onKeyDown = (e) => {
	    if (e.keyCode === 13) {
		    if(this.state.val.length >0){
			    this.setState({visibilityResult: true});
			    this.props.onInput(e);
		    }
	    }
	 };

	onLoadImg = (e) =>{
		e.target.classList.remove('img-loading');
		this.setState({imgStatus: false});
	};




 renderResults = (item, index) =>{
     return (
         <Link to={'/' + item.media_type + '/' + urlRusLat(item.title || item.name) + '-' + item.id} className="result-element" key={index} onClick={()=> this.setState({val: ''})}>
             <div className="result-element__poster">
	             {this.state.imgStatus ? <Spinner/>: null}
                 <img className="img-loading" onLoad={this.onLoadImg} src={(item.backdrop_path || item.poster_path) ? 'https://image.tmdb.org/t/p/w45_and_h67_bestv2/' + (item.backdrop_path || item.poster_path) :  NoImg} alt=""/>
             </div>
             <div className="result-element__title">
                 <div>{item.title || item.name}</div>
                 <div className="result-element__release">{item.release_date  ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4).substring(0, 4) : null}</div>
             </div>
             <div className="result-element__type">{(item.media_type === 'tv') ? 'сериал' : (item.media_type === 'movie') ? 'фильм': 'актер'}</div>
         </Link>
     );
 };
	handleUpdate = (values) => {
		const { top } = values;
		this.setState({ top });
	}

	renderView = ({ style, ...props }) => {
		const { top } = this.state;
		const viewStyle = {
			padding: 15,
			backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
			color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
		};
		return (
			<div
				className="box"
				style={{ ...style, ...viewStyle }}
				{...props}/>
		);
	}

	renderThumb = ({ style, ...props }) => {
		const { top } = this.state;
		const thumbStyle = {
			backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
		};
		return (
			<div
				style={{ ...style, ...thumbStyle }}
				{...props}/>
		);
	}

 render() {
	 const myScrollbar = {
		 width: 350,
		 height: 300
	 };


	    return (
         <div className="header__search search" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
			<div className="search-field-wrapper">
	             <DebounceInput className="search__field"
	                 name="Search"
	                 debounceTimeout={300}
	                 placeholder="Поиск фильмов и сериалов..."
	                 onKeyDown={this.onKeyDown}
	                 onInput={e => this.setState({val: e.target.value})}
	                 onChange={this.onInput}
	                 value={this.state.val}
	                            onFocus={e=> e.target.value.length>0? this.setState({visibilityResult: true}):null}
	             />

			</div>
	            {this.state.visibilityResult &&
		            <div className="search__result searchComboBox">
			            {this.props.SearchResult.isFetching &&
				            this.props.SearchResult.data.total_results >0 ?
				            <Scrollbars style={myScrollbar} autoHide autoHideTimeout={1000} autoHideDuration={600}

				                        onUpdate={this.handleUpdate}

				            >
					            {this.props.SearchResult.data.results.map((item, index)=> this.renderResults(item, index))}
				            </Scrollbars> : null}
		            </div> }

         </div>
     );
 }
}


const mapDispatchToProps = (dispatch) => ({
    onInput: (e) => dispatch(onSearch(e)),
    clearInput: () => dispatch(clearSearch())
});

function mapStateToProps(state) {
    return {
    	SearchVal: state.General.SearchHeaderField,
        SearchResult: state.General.SearchHeaderResult
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(SearchHeader);
