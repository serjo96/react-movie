import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {onSearch, clearSearch} from '../../actions/movies-action';
import { urlRusLat } from '../../utils/utils';
import NoImg from '../../img/NoImg.png';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visabilityResult: false
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
	 };

	 onKeyDown = (e) => {
	    if (e.keyCode === 13) {
	        console.log(e);
		    this.setState({visabilityResult: true});
		    this.props.onInput(e);
	    }
	 };


 renderResults = (item, index) =>{
     return (
         <Link to={'/' + item.media_type + '/' + urlRusLat(item.title || item.name) + '-' + item.id} className="result-element" key={index} onClick={this.props.clearInput}>
             <div className="result-element__poster">
                 <img src={(item.backdrop_path || item.poster_path) ? 'https://image.tmdb.org/t/p/w45_and_h67_bestv2/' + (item.backdrop_path || item.poster_path) :  NoImg} alt=""/>
             </div>
             <div className="result-element__title">
                 <div>{item.title || item.name}</div>
                 <div className="result-element__release">{item.release_date ? item.release_date.substring(0, 4) : null}</div>
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

             <input className="search__field" type="text" name="Search" placeholder="Поиск фильмов и сериалов..." onKeyDown={this.onKeyDown} onInput={this.onInput} value={this.props.SearchFieldVal}/>
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
        SearchFieldVal: state.SearchField,
        SearchResult: state.SearchResult
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(Search);
