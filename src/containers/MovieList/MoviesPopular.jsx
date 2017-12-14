import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { movieListPopular } from '../../actions/movies-actions';
import { connect } from 'react-redux';
import MovieList from '../../components/MediaList/MediaList';
import FilterList from '../../components/MediaList/FilterList';


class MoviesPopular extends Component {
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
	    if (this.props.PopMovies.data.page > 1) {
		    if (this.props.PopMovies.data.page <= 3) {
			    this.props.history.push('/movies/popular');
		    } else {
			    if (this.props.PopMovies.data.page >= 7) {
				    this.props.history.push(`/movies/popular?page=${this.props.PopMovies.data.page - 4}`);
			    } else{
				    this.props.history.push(`/movies/popular?page=${this.props.PopMovies.data.page - 3}`);
			    }
		    }
	    } else {
		    this.props.history.push(`/movies/popular${this.props.PopMovies.data.page+1}`);
	    }
    };

    nextPage = () => {
	    if (this.props.PopMovies.data.page > 1) {
		    if (this.props.PopMovies.data.page <= 3) {
			    this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page));
		    } else {
			    this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page-1));
		    }
        } else {
            this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page+1));
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
	 let { PopMovies } = this.props;
	    return (
		    <main className="main main--media-list">
			    <Helmet>
				    <title>Популярные фильмы</title>
			    </Helmet>
			    {PopMovies.isFetching ?
			    <div className="movies-content">
				        {/*<FilterList genres={this.props.genres}/>*/}
					    <MovieList movieListTitle={'Популярные фильмы'} movieList={PopMovies} typeList='movie'/>
					    {PopMovies.data.total_pages > 1 ?
					    <div className="pager-btns clearfix">
						    {PopMovies.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
						    {PopMovies.data.page+1 < PopMovies.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
					    </div> : null}
			    </div> : null}
		    </main>
	    );
 }
}

function mapStateToProps(state) {
    return {
        PopMovies: state.Movies.PopMovies,
	    genres: state.General.Genres
    };
}

const mapDispatchToProps = (dispatch) => ({
	loadList: (page) => dispatch(movieListPopular(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesPopular);
