import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {onSearch, clearSearch} from '../../actions/movies-action';
import { urlRusLat } from '../../utils/utils';
import NoImg from '../../img/NoImg.png';
import {DebounceInput} from 'react-debounce-input';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visabilityResult: false,
	        val: ''
        };
    }

    componentDidMount() {
        window.addEventListener('click', this.pageClick, false);
    }

 pageClick = (e) => {
     if (this.mouseIsDownOnCalendar) {
         return;
     }

     this.setState({
         visabilityResult: false
     });
 };


 mouseDownHandler = () => {
     this.mouseIsDownOnCalendar = true;
 };
 mouseUpHandler =() => {
     this.mouseIsDownOnCalendar = false;
 };


	 onInput = (e) => {
	     this.setState({visabilityResult: true});
	     this.props.onInput(e);
	     this.setState({val: e.target.value});
	 };

	 onKeyDown = (e) => {
	    if (e.keyCode === 13) {
		    this.setState({visabilityResult: true});
		    this.props.onInput(e);
	    }
	 };


 renderResults = (item, index) =>{
     return (
         <Link to={'/' + item.media_type + '/' + urlRusLat(item.title || item.name) + '-' + item.id} className="result-element" key={index} onClick={()=> this.setState({val: ''})}>
             <div className="result-element__poster">
                 <img src={(item.backdrop_path || item.poster_path) ? 'https://image.tmdb.org/t/p/w45_and_h67_bestv2/' + (item.backdrop_path || item.poster_path) :  NoImg} alt=""/>
             </div>
             <div className="result-element__title">
                 <div>{item.title || item.name}</div>
                 <div className="result-element__release">{item.release_date  ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4).substring(0, 4) : null}</div>
             </div>
             <div className="result-element__type">{(item.media_type === 'tv') ? 'сериал' : (item.media_type === 'movie') ? 'фильм': 'актер'}</div>
         </Link>
     );
 };


 render() {
	 const myScrollbar = {
		 width: 350,
		 height: 300
	 };


	    return (
         <div className="header__search search" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>

             <DebounceInput className="search__field"
                 name="Search"
                 debounceTimeout={300}
                 placeholder="Поиск фильмов и сериалов..."
                 onKeyDown={this.onKeyDown}
                 onInput={e => this.setState({val: e.target.value})}
                 onChange={this.onInput}
                 value={this.state.val}
             />
	            {this.state.visabilityResult &&
		            <div className="search__result searchComboBox">
			            {this.props.SearchResult.isFetching &&
				            this.props.SearchResult.data.total_results >0 ?
				            <Scrollbars style={myScrollbar} autoHide autoHideTimeout={1000} autoHideDuration={600}>
					            {this.props.SearchResult.data.results.map((item, index)=> this.renderResults(item, index))}
				            </Scrollbars> : null}
		            </div> }

         </div>
     );
 }
}


const mapDispatchToProps = (dispatch) => ({
    onInput: (e) => dispatch(onSearch(e.target.value)),
    clearInput: () => dispatch(clearSearch())
});

function mapStateToProps(state) {
    return {
    	SearchVal: state.movies.SearchField,
        SearchResult: state.movies.SearchResult
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(Search);
