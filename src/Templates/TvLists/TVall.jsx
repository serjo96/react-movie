import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { tvPopular } from '../../Data/actions/tv-actions';
import { connect } from 'react-redux';
import MediaList from '../MediaList/MediaList';
import FilterList from '../Filters/Containers/FilterList';
import {sortListTV} from './../../Data/localData';
import ServiceBlock from '../Service/ServiceBlock';
import queryString from 'query-string';


class TvPopular extends Component {
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

    get genresData(){
    	return this.props.genres.isFetching ? this.props.genres.data.obj : {};
    }

    get genres(){
    	return this.props.genres.isFetching ? this.props.genres.data.arr.AllGenres : [];
    }

    componentDidUpdate(prevProps, previousState) {
        if (this.props.location.search !== prevProps.location.search) {
            // this.scrollToTop();
	        this.sendRequest(prevProps);
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

    getUrlString() {
        return {
            genre: queryString.parse(this.props.location.search).genre,
            country: queryString.parse(this.props.location.search).country,
            sort_direction: queryString.parse(this.props.location.search).dir,
            year: queryString.parse(this.props.location.search).year,
            page: queryString.parse(this.props.location.search).page
        };
    }

     sendRequest = () =>{
	     let page = +this.getUrlString().page;
	     let genres = this.getUrlString().genre;
	     let { sortSettings } = this.state;
	     let { sortType } = this.state;

         // TODO: добаваить генерируемый объект для отправки данных и изменять его в зависимости от условий, и оставить одну функцию отправки
	     if (page) {
		     if (page <= 2) {
			     this.props.loadList(page + 1, genres, sortType, sortSettings.sortByDate, sortSettings.sortByCountry.ico, sortSettings.adult);
		     } else {
			     if (page <= 3) {
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
	    let urlObj = this.getUrlString();


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
	    let urlObj = this.getUrlString();

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
     let genreStr = this.getUrlString();
     genreStr.genre = filterId;

     if (filterId === 0) {
         delete genreStr.genre;
     }

     this.props.history.push({
         search: queryString.stringify(genreStr)
     });
 };

 onClickCountry = (countryData) => {
     let countryStr = this.getUrlString();
     countryStr.country = countryData;

     this.props.history.push({
         search: queryString.stringify(countryStr)
     });
 };

 sortList = (type, settings) =>{
     if (this.props.location.search) {
         this.props.history.push({
             pathname: this.props.location.pathname,
             search: this.props.location.search,
             state: null
         });
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
	 let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 let { allTV } = this.props;
	    return (
		    <main className="main main--media-list">
			    <Helmet>
				    <title>Популярные сериалы</title>
			    </Helmet>

			    <ServiceBlock
				    isLoading={allTV.isFetching}
				    isError={allTV.status}
				    fetch={this.sendRequest}
			    >

			    <div className="movies-content">
				    <FilterList location={this.props.location}
				                genresData={this.genresData}
				                genres={this.genres}
				                onClickGenres={this.GenresFilter}
				                onClickCountry={this.onClickCountry}
				                onClickSortList={this.sortList}
				                sortByCountry={false}
				                safeFilter={false}
				                sortListType={sortListTV}
				                MobileFilter={width >= 963}
				    />
					    <MediaList movieListTitle={`Всего сериалов (${allTV.data.total_results})`} movieList={allTV} typeList="tv"/>
					    {allTV.data.total_pages > 1 ?
					    <div className="pager-btns clearfix">
						    {allTV.data.page - 1 > 1
							    ? <div
								    className="pager-btn pager-btn--prev link-angle link-angle--left"
								    onClick={this.prevPage}>
								    <i className="fa fa-angle-left" aria-hidden="true" />
								    <span>Предыдущая страница</span>
							      </div>
							    : null}
						    {allTV.data.page + 1 < allTV.data.total_pages
							    ? <div
								    className="pager-btn pager-btn--next link-angle"
								    onClick={this.nextPage}>
								    <span>Следующая страница</span>
								    <i className="fa fa-angle-right" aria-hidden="true" />
							      </div>
							    : null}
					    </div> : null}
			    </div>
			    </ServiceBlock>
		    </main>
	    );
  }
}

function mapStateToProps(state) {
    return {
        allTV: state.TVs.allTV,
	    genres: state.General.Genres
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadList: (page, genre, sortType, date, country, adult) => dispatch(tvPopular(page, genre, sortType, date, country, adult))
});


export default connect(mapStateToProps, mapDispatchToProps)(TvPopular);
