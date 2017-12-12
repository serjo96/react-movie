import React, {Component} from 'react';
import { movieListPlaying } from '../../actions/movies-actions';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import MovieList from '../../components/MediaList/MediaList';


class MoviePlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
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
		 let movieId = parseFloat(this.props.location.search.split('=').pop());
		 if (this.props.location.search) {
			 if(movieId <= 2){
				 this.props.loadList(movieId+1);
			 } else{
				 if(movieId <= 3) {
					 this.props.loadList(movieId + 2);
				 } else {
					 this.props.loadList(movieId + 3);
				 }
			 }
		 } else {
			 this.props.loadList();
		 }
	 };

	 prevPage = () => {
		 if (this.props.PlayMovies.data.page > 1) {
			 if (this.props.PlayMovies.data.page <= 3) {
				 this.props.history.push('/movies/playing');
			 } else {
				 if (this.props.PlayMovies.data.page >= 7) {
					 this.props.history.push(`/movies/playing?page=${this.props.PlayMovies.data.page - 4}`);
				 } else {
					 this.props.history.push(`/movies/playing?page=${this.props.PlayMovies.data.page - 3}`);
				 }
			 }
		 } else {
			 this.props.history.push(`/movies/playing${this.props.PlayMovies.data.page+1}`);
		 }
	 };

	 nextPage = () => {
	     if (this.props.PlayMovies.data.page > 1) {
	         if (this.props.PlayMovies.data.page <= 3) {
	             this.props.history.push('/movies/playing?page=' + (this.props.PlayMovies.data.page));
	         } else {
	             this.props.history.push('/movies/playing?page=' + (this.props.PlayMovies.data.page-1));
	         }
	     } else {
	         this.props.history.push('/movies/playing?page=' + (this.props.PlayMovies.data.page+1));
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
	 let { PlayMovies } = this.props;
     return (
         <main className="main main--media-list">
             <Helmet>
                 <title>В прокате</title>
             </Helmet>
             {PlayMovies.isFetching ?
                 <div className="movies-content">
                     <MovieList movieListTitle={'Сейчас в кино'} movieList={PlayMovies} typeList='movie'/>
                     {PlayMovies.data.total_pages > 1 ?
                         <div className="pager-btns clearfix">
                             {PlayMovies.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
                             {PlayMovies.data.page+1 < PlayMovies.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
                         </div> : null}
                 </div> : null}
         </main>
     );
 }
}

function mapStateToProps(state) {
    return {
        PlayMovies: state.Movies.PlayingMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
	loadList: (page) => dispatch(movieListPlaying(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviePlaying);
