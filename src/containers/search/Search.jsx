import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {onSearch} from '../../actions/movies-action';
import { urlRusLat } from '../../utils/utils';
import NoImg from '../../img/NoImg.png';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visabilityResult: false
        };
    }
 onBlur = (e) => {
     this.setState({visabilityResult: false});
 };

 onInput = (e) => {
     this.setState({visabilityResult: true});
     this.props.onInput(e);
 };

 render() {
	    function isMatching(full, chunk) {
		    full = full.toLowerCase();
		    chunk = chunk.toLowerCase();
		    if (full.substr(0, chunk.length) === chunk) {
			    return true;
		    }
		    return false;
	    }

	    return (
         <div className="header__search search" onClick={this.test}>

             <input className="search__field" type="text" name="Search" placeholder="Поиск фильмов и сериалов..." onBlur={this.onBlur} onInput={this.onInput} value={this.props.SearchFieldVal}/>
	                {this.state.visabilityResult ?
	                    <div className="search__result searchComboBox">
	                        {this.props.SearchResult.isFetching ?
	                            this.props.SearchResult.data.results.map((item, index)=>
		                            isMatching( item.title || item.name, this.props.SearchFieldVal) ?
		                            (<Link to={urlRusLat(item.title || item.name) + '-' + item.id} className="result-element" key={index}>
			                            <div className="result-element__poster"><img src={item.backdrop_path ? 'https://image.tmdb.org/t/p/w45_and_h67_bestv2/' + item.backdrop_path : NoImg} alt=""/></div>
			                            <div className="result-element__title">
				                            <div>{item.title || item.name}</div>
				                            <div className="result-element__release">{item.release_date ? item.release_date.substring(0, 4) : null}</div>
			                            </div>
			                            <div className="result-element__type">{item.media_type === 'tv' ? 'сериал' : 'фильм'}</div>
		                            </Link>) : null
	                            )  : null}
	                    </div> : null}
         </div>
     );
 }
}


const mapDispatchToProps = (dispatch) => ({
    onInput: (e) => dispatch(onSearch(e.target.value))
});

function mapStateToProps(state) {
    return {
        SearchFieldVal: state.SearchField,
        SearchResult: state.SearchResult
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(Search);
