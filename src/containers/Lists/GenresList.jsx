import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import MovieList from '../../components/MediaList/MediaList';
import { genreReq } from '../../actions/general-actions';
import { friendlyUrl } from '../../utils/utils';
import Spinner from '../../components/Spinner/Spinner';

class GenresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            imgStatus: true
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
        this.sendRequest();
    }


 sendRequest = () =>{
     let pageNubmer = parseFloat(this.props.location.search.split('=').pop()),
         idRequest = this.props.match.params.id.split('-').pop(),
         typeRequest;
     if (this.props.match.url.match(/movie/)) {
         typeRequest = 'movie';
     } else {
         typeRequest = 'tv';
     }
     if (this.props.location.search) {
         if (pageNubmer <= 2) {
             this.props.sendGenreReq(idRequest, typeRequest, pageNubmer+1);
         } else {
             if (pageNubmer <= 3) {
                 this.props.sendGenreReq(idRequest, typeRequest, pageNubmer + 2);
             } else {
                 this.props.sendGenreReq(idRequest, typeRequest, pageNubmer + 3);
             }
         }
     } else {
         this.props.sendGenreReq(idRequest, typeRequest);
     }
 };


 prevPage = () => {
     let path = this.props.match.params.id,
         typeRequest = 'movie';
     if (this.props.GenresListData.data.page > 1) {
         if (this.props.GenresListData.data.page <= 3) {
             this.props.history.push(`/lists/genres_${typeRequest}/${path}`);
         } else {
             if (this.props.GenresListData.data.page >= 7) {
                 this.props.history.push(`/lists/genres_${typeRequest}/${path}/?page=${this.props.GenresListData.data.page-4}`);
             } else {
                 this.props.history.push(`/lists/genres_${typeRequest}/${path}/?page=${this.props.GenresListData.data.page-3}`);
             }
         }
     } else {
         this.props.history.push(`/lists/genres_${typeRequest}/`);
     }
 };

 nextPage = () => {
     let path = this.props.match.params.id,
         typeRequest = 'movie';
     if (this.props.GenresListData.data.page > 1) {
         if (this.props.GenresListData.data.page <= 3) {
             this.props.history.push(`/lists/genres_${typeRequest}/${path}/?page=${this.props.GenresListData.data.page}`);
         } else {
             this.props.history.push(`/lists/genres_${typeRequest}/${path}/?page=${this.props.GenresListData.data.page-1}`);
         }
     } else {
         this.props.history.push(`/lists/genres_${typeRequest}/${path}/?page=${this.props.GenresListData.data.page+1}`);
     }
 };


 onLoadImg = (e) =>{
     e.target.classList.remove('img-loading');
     this.setState({imgStatus: false});
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

     let {GenresListData} = this.props,
         {Genres} = this.props,
         titleSearch = '',
         typeRequest;
     if (this.props.match.url.match(/movie/)) {
         typeRequest = 'movie';
     } else {
         typeRequest = 'tv';
     }
     if (Genres.isFetching) {
         titleSearch = Genres.data[this.props.match.params.id.split('-').pop()];
     }
     if (GenresListData.isFetching) {
         return (
             <div className="main">

                 <Helmet>
                     <title>{`Жанр: ${titleSearch}`}</title>
                 </Helmet>
                 <div className="container">
                     <div className="search-results">
                         <MovieList movieListTitle={`Жанр: ${titleSearch} (${GenresListData.data.total_results})`} movieList={GenresListData} typeList={typeRequest}/>
                         {GenresListData.data.total_pages > 1 ?
                             <div className="pager-btns clearfix">
                                 {GenresListData.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
                                 {GenresListData.data.page+1 < GenresListData.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
                             </div> : null}
                     </div>
                 </div>
             </div>
         );
     } 
     return (<Spinner/>);
		
 }
}


const mapDispatchToProps = (dispatch) => ({
    sendGenreReq: (id, type, page) => dispatch(genreReq(id, type, page))
});

function mapStateToProps(state) {
    return {
        GenresListData: state.General.GenresList,
        Genres: state.General.Genres
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(GenresList);
