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
            intervalId: 0,
	        sortType: 'popularity.desc',
	        sortDate: 0,
	        sortSettings: {
		        sortType: null,
		        sortByDate: {
		        	data: null
		        },
		        sortByCountry: {
		        	ico: null
		        }
	        }
        };
    }

    componentDidUpdate(prevProps, previousState) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
	        this.sendRequest();
        } else if (previousState.sortSettings !== this.state.sortSettings){
	        this.sendRequest();
        }
    }

    componentDidMount() {
	    if (window.pageYOffset === 0) {
		    clearInterval(this.state.intervalId);
	    }
        this.sendRequest();
    }

     sendRequest = () =>{
	     let page = parseFloat(this.props.location.search.split('=').pop()) ? parseInt(this.props.location.search.split('=').pop()) : undefined,
		     genres = this.props.location.search.match(/genre/g) ? parseInt(this.props.location.search.split(/-/).pop()) : '',
		     {sortSettings} = this.state,
		     {sortType} = this.state;

	      if (page) {
	     	if(page <= 2){
		        this.props.loadList(page+1, genres, sortType, sortSettings.sortByDate, sortSettings.sortByCountry.ico, sortSettings.adult);
	        } else{
		        if(page <= 3) {
			        this.props.loadList(page + 2, genres, sortType, sortSettings.sortByDate, sortSettings.sortByCountry.ico, sortSettings.adult);
		        } else {
			        this.props.loadList(page + 3, genres, sortType, sortSettings.sortByDate, sortSettings.sortByCountry.ico, sortSettings.adult);
		        }
	        }
	     } else {
		     this.props.loadList(undefined, genres, sortType, sortSettings.sortByDate, sortSettings.sortByCountry.ico, sortSettings.adult);
	     }
     };

    prevPage = () => {
	    let path = this.props.PopMovies.data.page > 1 ? this.props.location.search.substring(this.props.location.search.lastIndexOf('?')+1,this.props.location.search.lastIndexOf('%')) : this.props.location.search.replace('?', '');
	    if (this.props.PopMovies.data.page > 1) {
		    if (this.props.PopMovies.data.page <= 3) {
			    this.props.history.push(`/movies?${path}`);
		    } else {
			    if (this.props.PopMovies.data.page >= 7) {
				    this.props.history.push(`/movies?${path}%page=${this.props.PopMovies.data.page - 4}`);
			    } else{
				    this.props.history.push(`/movies?${path}%page=${this.props.PopMovies.data.page - 3}`);
			    }
		    }
	    } else {
		    this.props.history.push(`/movies${this.props.PopMovies.data.page+1}`);
	    }
    };

    nextPage = () => {
	    let path = this.props.PopMovies.data.page > 1 ? this.props.location.search.substring(this.props.location.search.lastIndexOf('?')+1,this.props.location.search.lastIndexOf('%')) : this.props.location.search.replace('?', '');
	    if (this.props.PopMovies.data.page > 1) {
		    if (this.props.PopMovies.data.page <= 3) {
			    this.props.history.push(`/movies?${path}%page=${this.props.PopMovies.data.page}`);
		    } else {
			    this.props.history.push(`/movies?${path}%page=${this.props.PopMovies.data.page-1}`);
		    }
        } else {
            this.props.history.push(`/movies?${path}%page=${this.props.PopMovies.data.page+1}`);
        }
    };



	GenresFilter = (id) => {
		if(id === 0){
			this.props.history.push(`/movies/popular`);
		} else{
			this.props.history.push(`/movies/popular?genre-${id}`);
		}
	};

	sortList = (type, settings) =>{
		let genres = this.props.location.search.match(/genre/g) ? parseInt(this.props.location.search.split(/-/).pop()) : '';
		if(genres){
			this.props.history.push(`/movies?genre-${genres}`);
		} else {
			this.props.history.push(`/movies`);
		}
		this.setState({sortType: type, sortSettings: settings});
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
				    <title>Фильмы</title>
			    </Helmet>
			    {PopMovies.isFetching ?
			    <div className="movies-content">
				    <FilterList location={this.props.location}
				                genresData={this.props.genres.isFetching ? this.props.genres.data.obj: {}}
				                genres={this.props.genres}
				                onClickGenres={this.GenresFilter}
				                SortList={this.sortList}
				    />
					    <MovieList movieListTitle={`Всего фильмов (${PopMovies.data.total_results})`} movieList={PopMovies} typeList='movie'/>
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
	loadList: (page, genre, sortType, date, country, adult) => dispatch(movieListPopular(page, genre, sortType, date, country, adult))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesPopular);
