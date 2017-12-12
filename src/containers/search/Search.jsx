import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import MovieList from '../../components/MediaList/MediaList';
import {keywordsReq, genreReq, MainSearch} from '../../actions/general-actions';
import { friendlyUrl } from '../../utils/utils';
import {DebounceInput} from 'react-debounce-input';
import Spinner from '../../components/Spinner/Spinner';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '',
            top: 0,
            fullSearch: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
            this.sendRequest(prevProps);
        }
    }

    componentDidMount() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
	    if (this.props.location.search.match(/page/)) {
		    this.setState({val: decodeURI(this.props.location.search.substring(this.props.location.search.lastIndexOf('?')+1, this.props.location.search.lastIndexOf('%')).replace('?', '').replace(/_/g, ' '))});
        } else {
            this.setState({val: decodeURI(this.props.location.search.replace('?', '').replace(/_/g, ' '))});
        }
        this.sendRequest();
    }


 sendRequest = () =>{
     let id =  this.props.location.search,
         Request = id.split('-'),
         searchTarget;
	 console.log('_asdasdas/'.match(/([^_])(.*?)(?=\/)/g))
     if (this.props.location.search.match(/page/)) {

         let pageNumber = parseFloat(this.props.location.search.split('=').pop()),
	         searchTarget = decodeURI(id.substring(id.lastIndexOf('?')+1, id.lastIndexOf('%')).replace('?', '').replace(/_/g, ' '));
         if (pageNumber <= 2) {
             this.props.onSearch(searchTarget, pageNumber+1);
         } else {
             if (pageNumber <= 3) {
                 this.props.onSearch(searchTarget, pageNumber+2);
             } else {
                 this.props.onSearch(searchTarget, pageNumber+3);
             }
         }
     } else {
	     searchTarget = decodeURI(this.props.location.search.replace('?', '').replace(/_/g, ' '));
         this.props.onSearch(searchTarget);
     }
 };


 prevPage = () => {
     let path;
     if (this.props.SearchResult.data.page > 1) {
	     path = decodeURI(this.props.location.search.substring(this.props.location.search.lastIndexOf('?')+1, this.props.location.search.lastIndexOf('%')));
         if (this.props.SearchResult.data.page <= 3) {
             this.props.history.push(`/search?${path}`);
         } else {
             if (this.props.SearchResult.data.page >= 7) {
                 this.props.history.push(`/search?${path}%page=${this.props.SearchResult.data.page-4}`);
             } else {
                 this.props.history.push(`/search?${path}%page=${this.props.SearchResult.data.page-3}`);
             }
         }
     } else {
	     path = decodeURI(this.props.location.search.replace('?', ''));
         this.props.history.push(`/search?${path}`);
     }
 };

 nextPage = () => {
     let path;

     if (this.props.SearchResult.data.page > 1) {
	     path = decodeURI(this.props.location.search.substring(this.props.location.search.lastIndexOf('?')+1, this.props.location.search.lastIndexOf('%')));
         if (this.props.SearchResult.data.page <= 3) {
             this.props.history.push(`/search?${path}%page=${this.props.SearchResult.data.page}`);
         } else {
             this.props.history.push(`/search?${path}%page=${this.props.SearchResult.data.page-1}`);
         }
     } else {
	     path = decodeURI(this.props.location.search.replace('?', ''));
         this.props.history.push(`/search?${path}%page=${this.props.SearchResult.data.page+1}`);
     }
 };


 onInput = (e) => {
     this.setState({val: e.target.value});
     if (this.state.val.length >0) {
         this.props.history.push(`/search?${friendlyUrl(this.state.val)}`);
         this.props.onSearch(this.state.val);
     }
 };


 onKeyDown = (e) => {
     if (e.keyCode === 13) {
         if (this.state.val.length >0) {
             this.props.history.push(`/search?${friendlyUrl(this.state.val)}`);
             this.props.onSearch(this.state.val);
         }
     }
 };

 onClick = (e) =>{
     if (this.state.val.length >0) {
         this.props.history.push(`/search?${friendlyUrl(this.state.val)}`);
         this.props.onSearch(this.state.val);
     }
 };


 scrollStep = () => {
     if (window.pageYOffset === 0) {
         clearInterval(this.state.intervalId);
     }
     window.scroll(0, window.pageYOffset - 50);
 };

 scrollToTop = () => {
     let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
     this.setState({ intervalId: intervalId });
 };


 render() {

     let {SearchResult} = this.props,
         {Genres} = this.props,
         titleSearch = `Результаты поиска «${SearchResult.data.qurySearch}»`;

     return (
         <div className="search-page main">

             <Helmet>
                 <title>{titleSearch}</title>
             </Helmet>
             <div className="container">
                 <div className="search-field-wrapper">
                     <DebounceInput className="search__field"
						               name="Search"
						               debounceTimeout={300}
						               placeholder="Поиск фильмов и сериалов..."
						               onKeyDown={this.onKeyDown}
						               onInput={e => this.setState({val: e.target.value})}
						               onChange={this.onInput}
						               value={this.state.val}
                     />
                     <div className="search-field-btn" onClick={this.onClick}>
                         <i className="fa fa-search" aria-hidden="true"/>
                     </div>
                 </div>
                 {SearchResult.isFetching ?
                     <div className="search-results">
                         <MovieList movieListTitle={`${titleSearch} (${SearchResult.data.total_results})`} movieList={SearchResult} typeList="movie"/>
                         {SearchResult.data.total_pages > 1 ?
                             <div className="pager-btns clearfix">
                                 {SearchResult.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
                                 {SearchResult.data.page+1 < SearchResult.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
                             </div> : null}
                     </div> : null}
             </div>
         </div>
     );
 }
}


const mapDispatchToProps = (dispatch) => ({
    onSearch: (id, page) => dispatch(MainSearch(id, page))
});

function mapStateToProps(state) {
    return {
        SearchResult: state.General.SearchPageResult,
        Genres: state.General.Genres
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(Search);
