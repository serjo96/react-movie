import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { Scrollbars } from 'react-custom-scrollbars';

import { clearSearch} from './../../Data/actions/general-actions';
import { onSearch} from './../../Data/api/Search.api';
import { friendlyUrl, urlRusLat } from './../../utils/utils';
import NoImg from './../../assests/img/NoImg.png';
import Spinner from './../Spinner/Spinner';

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

	 onInput = (e) => {
	     this.setState({
		     val: e.target.value,
		     visibilityResult: true
	     });

	     if (this.state.val.length > 0) {
	        this.props.onInput(this.state.val, 'header-search');
	     }
	 };


	 onKeyDown = (e) => {
	    if (e.keyCode === 13) {
		    if (this.state.val.length > 0) {
			    this.setState({visibilityResult: false});
			    this.props.history.push(`/search?${friendlyUrl(this.state.val)}`);
			    document.querySelector('.header__search').classList.remove('header__search--mobile');
		    }
	    }
	 };

	 onClickSearch = () => {
	     if (this.state.val.length > 0) {
	         this.setState({visibilityResult: false});
	         this.props.history.push(`/search?${friendlyUrl(this.state.val)}`);
		     document.querySelector('.header__search').classList.remove('header__search--mobile');
	     }
	 };

	 onLoadImg = (e) =>{
	     e.target.classList.remove('img-loading');
		 setTimeout(()=> this.setState({imgStatus: false}), 500);
	 };


 renderResults = (item, index) =>{
     return (
         <Link
	         to={'/' + item.media_type + '/' + urlRusLat(item.title || item.name) + '-' + item.id}
	         className="result-element"
	         key={index}
	         onClick={()=> this.setState({val: ''})}
         >
             <div className="result-element__poster">
	             {this.state.imgStatus ? <Spinner/> : null}
                 <img
	                 className="img-loading"
	                 onLoad={this.onLoadImg}
	                 src={(item.profile_path || item.backdrop_path || item.poster_path)
		                 ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + (item.profile_path || item.backdrop_path || item.poster_path)
		                 :  NoImg}
	                 alt=""
                 />
             </div>
             <div className="result-element__title">
                 <div>{item.title || item.name}</div>
                 <div className="result-element__release">
	                 {item.release_date
		                 ? item.release_date.substring(0, 4)
		                 : item.first_air_date
			                 ? item.first_air_date.substring(0, 4).substring(0, 4)
			                 : null}
	             </div>
             </div>
             <div className="result-element__type">{(item.media_type === 'tv') ? 'сериал' : (item.media_type === 'movie') ? 'фильм' : 'актер'}</div>
         </Link>
     );
 };

 handleUpdate = (values) => {
     const { top } = values;
     this.setState({ top });
 };

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
             {...props}
         />
     );
 };

 renderThumb = ({ style, ...props }) => {
     const { top } = this.state;
     const thumbStyle = {
         backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
     };
     return (
         <div
             style={{ ...style, ...thumbStyle }}
             {...props}
         />
     );
 };

 render() {
	 const myScrollbar = {
		 width: 350
	 };


	    return (
         <div className="header__search search">
             <div className="search-field-wrapper">
	             <DebounceInput
		             className="search__field search__field--header"
	                 name="Search"
		             type="search"
	                 debounceTimeout={300}
	                 placeholder="Поиск фильмов и сериалов..."
	                 onKeyDown={this.onKeyDown}
	                 onInput={e => this.setState({val: e.target.value})}
	                 onChange={this.onInput}
		             onBlur={()=> this.setState({visibilityResult: false})}
	                 value={this.state.val}
		             onFocus={e=> e.target.value.length > 0 ? this.setState({visibilityResult: true}) : null}
	             />
                 <div className="search-btn" onClick={this.onClickSearch}><i className="fa fa-search" aria-hidden="true"/></div>

             </div>
	            {this.state.visibilityResult &&
		            <div className="search__result searchComboBox">

			            {this.props.SearchResult.isFetching
				            ? this.props.SearchResult.data.total_results > 0
					            ? <Scrollbars style={myScrollbar} autoHeight
					                        autoHeightMin={95}
					                        autoHeightMax={300}  autoHideTimeout={1000} autoHideDuration={600}
					                        renderView={props => <div {...props} className="ComboBox-view"/>}
					                        onUpdate={this.handleUpdate}
					                        className="comboBox-view-wrap"
					            >
						            { this.props.SearchResult.data.results.map((item, index)=> this.renderResults(item, index))}
					            </Scrollbars>
				                : <div className="result-element">Поиск не дал результатов, попробуйте уточнить поиск</div>
				            : null}
		            </div> }

         </div>
     );
 }
}


const mapDispatchToProps = (dispatch) => ({
    onInput: (e, type) => dispatch(onSearch(e, type)),
    clearInput: () => dispatch(clearSearch())
});

function mapStateToProps(state) {
    return {
    	SearchVal: state.General.SearchHeaderField,
        SearchResult: state.General.SearchHeaderResult
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(SearchHeader);
