import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { changeMoviePage } from './../../Data/actions/movies-actions';
import { movieListPopular } from './../../Data/api/Movies.api';
import MovieList from './../MediaList/MediaList';
import FilterList from './../Filters/Containers/FilterList';
import { sortListType } from './../../Data/localData';
import ServiceBlock from './../Service/ServiceBlock';

class MoviesAll extends Component {
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

            // this.scrollToTop();
	        this.sendRequest();
        } else if (previousState.sortSettings !== this.state.sortSettings) {
	        this.sendRequest();
        }
    }

    componentDidMount() {
	    // if (window.pageYOffset === 0) {
		 //    clearInterval(this.state.intervalId);
	    // }
	    // this.scrollToTop();
	    this.sendRequest();
    }
    

    get getUrlString() {
        return {
            genre: queryString.parse(this.props.location.search).genre,
            country: queryString.parse(this.props.location.search).country,
	        sort_by: queryString.parse(this.props.location.search).sort_by,
            year: queryString.parse(this.props.location.search).year,
            page: queryString.parse(this.props.location.search).page,
	        adult: queryString.parse(this.props.location.search).adult
        };
    }


    // TODO: Убрать портянку из if else, и решить вопрос с локальным стейтом в фильтрах(нужен ли он или использовать стейт урл)
    // TODO: Добавить adult to URL
    // TODO: Добавить правельный парсинг sort_by
    // TODO: Добавить правельный парсинг direction
     sendRequest = () => {
	     let page = +this.getUrlString.page;

		 let UrlStateObj = {
			 page: +this.getUrlString.page,
			 country: this.getUrlString.country,
			 genres: this.getUrlString.genre,
			 sort_by: this.getUrlString.sort_by,
			 year: this.getUrlString.year
		 };

	     if (page) {
	     	if (page <= 2) {
		        UrlStateObj.page += 1;
	        } else {
		        if (page <= 3) {
			        UrlStateObj.page += 2;
		        } else {
			        UrlStateObj.page += 3;
		        }
	        }
	     } else {
	     	delete UrlStateObj.page;
	     }

	     this.props.loadList(UrlStateObj.page, UrlStateObj.genres, UrlStateObj.sort_by, UrlStateObj.year, UrlStateObj.country, UrlStateObj.adult);
     };

    prevPage = () => {
	    let urlObj = this.getUrlString;
	    this.props.changeListStatus('AllMovies');


	    if (this.props.AllMovies.data.page <= 3) {
		    delete urlObj.page;
	    }

	    if (this.props.AllMovies.data.page === 5 ) {
		    urlObj.page = this.props.AllMovies.data.page - 3;
	    }

	    if ( this.props.AllMovies.data.page >= 7 ) {
		    urlObj.page = this.props.AllMovies.data.page - 4;
	    }

	    this.props.history.push({
		    search: queryString.stringify(urlObj)
	    });
    };

    nextPage = () => {
	    let urlObj = this.getUrlString;
	    this.props.changeListStatus('AllMovies');

	    if (this.props.AllMovies.data.page <= 3) {
		    urlObj.page = this.props.AllMovies.data.page;
	    }

	    if (this.props.AllMovies.data.page === 5 ) {
		    urlObj.page = this.props.AllMovies.data.page - 1;
	    }

	    if ( this.props.AllMovies.data.page >= 7 ) {
		    urlObj.page = this.props.AllMovies.data.page - 2;
	    }

	    this.props.history.push({
		    search: queryString.stringify(urlObj)
	    });
    };

	 GenresFilter = (filterId) => {
		 let UrlObj = this.getUrlString;
		 UrlObj.genre = filterId;

		 if (filterId === 0) {
			 delete UrlObj.genre;
		 }

		 this.props.history.push({
			 search: queryString.stringify(UrlObj)
		 });

	 };

	 onClickCountry = (countryData) => {
	    let UrlObj = this.getUrlString;
		 UrlObj.country = countryData;

	    this.props.history.push({
		    search: queryString.stringify(UrlObj)
	    });
	 };

	 onSortByDate = (date) => {
	 	let newDate;
		 let UrlObj = this.getUrlString;
		 if (date.type === 'range') {
			 newDate = date.date.split('=');
			 UrlObj.year = new Date(newDate[0]).getFullYear() + '-' + new Date(newDate[1]).getFullYear();
		 } else {
			 UrlObj.year = date.date;
		 }

		 this.props.history.push({
			 search: queryString.stringify(UrlObj)
		 });
	 };

	 sortList = (type, settings) =>{

		 let UrlObj = this.getUrlString;
		 UrlObj.sort_by = type;

		 this.props.history.push({
			 search: queryString.stringify(UrlObj)
		 });


	     this.setState({sortType: type, sortSettings: settings});
	 };

	 onClickAdult(adult) {

		 let UrlObj = this.getUrlString;
		 UrlObj.adult = adult;

		 this.props.history.push({
			 search: queryString.stringify(UrlObj)
		 });

	 }

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
	 let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 let { AllMovies } = this.props;
	    return (
		    <main className="main main--media-list">
			    <Helmet>
				    <title>Фильмы</title>
			    </Helmet>
			    <ServiceBlock
				    isLoading={AllMovies.isFetching}
				    isError={AllMovies.status}
				    fetch={this.sendRequest}
			    >

			    <div className="movies-content">
				    <FilterList location={this.props.location}
				                genresData={this.props.genres.isFetching ? this.props.genres.data.obj : {}}
				                genres={this.props.genres.isFetching ? this.props.genres.data.arr.movieGenres : []}
				                onClickGenres={this.GenresFilter}
				                onClickCountry={this.onClickCountry}
				                onClickSortList={this.sortList}
				                onClickSortDate={this.onSortByDate}
				                sortByCountry={true}
				                safeFilter={true}
				                sortListType={sortListType}
				                MobileFilter={width >= 963}
				    />
					    <MovieList
						    movieListTitle={`Всего фильмов (${AllMovies.data.total_results})`}
						    movieList={AllMovies}
						    typeList="movie"
					    />
					    {AllMovies.data.total_pages > 1
						    ? <div className="pager-btns clearfix">
							    {AllMovies.data.page - 1 > 1
								    ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}>
									    <i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span>
								    </div>
								    : null}
							    {AllMovies.data.page + 1 < AllMovies.data.total_pages
								    ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}>
									    <span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div>
								    : null}
						    </div>
						    : null}
			    </div>
			    </ServiceBlock>
		    </main>
	    );
  }
}

function mapStateToProps(state) {
    return {
	    AllMovies: state.Movies.AllMovies,
	    genres: state.General.Genres
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadList: (page, genre, sortType, date, country, adult) => dispatch(movieListPopular(page, genre, sortType, date, country, adult)),
    changeListStatus: (type) => dispatch(changeMoviePage(type))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesAll);
