import React, { Component } from 'react';
import update from 'react-addons-update';
import queryString from 'query-string';

import { storageCountries } from './../../../Data/localData';

import FiltersMobile from './../components/FiltersMobile';
import Filters from './../components/Filters';


class ListsPage extends Component {
    constructor( props ) {
        super(props);
        this.state = {
        	sortSettings: {
	            genresListName: {
	                name: 'Все жанры',
	                id: 0,
		            status: false
	            },
	            sortBy: {
	                name: 'По популярности',
	                type: 'popularity',
		            status: false
	            },
		        sortByDate: {
	            	name: 'Все года',
			        date: '',
			        type: 'single',
			        status: false
		        },
		        sortByCountry: {
	            	name: 'Все страны',
			        ico: '',
			        status: false
		        },
		        SortDirection: false,
		        adult: false
	        },
	        genresListData: {
		        name: 'Все жанры',
		        id: 0
	        },
	        modalFilter: false
        };
    }

    componentDidMount() {
    	this.getInitState();
    }

    componentDidUpdate(_, previousState) {
    	if (previousState.sortSettings.sortBy !== this.state.sortSettings.sortBy || previousState.sortSettings.SortDirection !== this.state.sortSettings.SortDirection) {
		    this.onSortLists();
	    }
    }

    getInitState() {

	    let newState = update(this.state.sortSettings, {$merge: {

			    sortByDate: {
				    name: this.getUrlString.year ? this.getUrlString.year : 'Все года',
				    date: this.getUrlString.year ? this.getUrlString.year : '',
				    type: 'single',
				    status: !!this.getUrlString.year
			    },
			    sortByCountry: {
				    name: this.getUrlString.country ? storageCountries.filter(i=> i.ico === this.getUrlString.country).pop().name : 'Все страны',
				    ico: this.getUrlString.country ? this.getUrlString.country : '',
				    status: !!this.getUrlString.country
			    },
			    adult: this.getUrlString.adult
		    }});

	    this.setState({
		    sortSettings: {...newState},
		    genresListData: {
			    name: this.props.genresData[this.getUrlString.genre] || 'Все жанры',
			    id: this.getUrlString.genre,
			    status: !!this.getUrlString.genre
		    }
	    });
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


    onClickSort = (el) => {
		 let newState = update(this.state.sortSettings, {$merge: {
				 sortBy: {
					 name: el.name, type: el.type, status: true
				 }
			 }});
		 this.setState({
			 sortSettings: {
				 ...newState
			 }
		 });
    };

    onSortLists = () =>{
    	let fullType = this.state.sortSettings.sortBy.type + (this.state.sortSettings.SortDirection ? '.asc' : '.desc');
    	this.props.onClickSortList(fullType, this.state.sortSettings);
    };

    onSortByDate = (el) => {
	    let newState = update(this.state.sortSettings, {$merge: {
			    sortByDate: {
				    name: el.name,
				    date: el.date,
				    type: el.type,
				    status: true
			    }
		    }});

	    this.props.onClickSortDate({
		    date: el.date,
		    type: el.type
	    });
	    this.setState({
		    sortSettings: {
			    ...newState
		    }
	    });
    };

    onSortByCountry = (el) => {
	    let newState = update(this.state.sortSettings, {$merge: {
			    sortByCountry: {
				    name: el.name,
				    ico: el.ico,
				    status: true
			    }
		    }});
	    this.setState({
		    sortSettings: {
			    ...newState
		    }
	    });

	    this.props.onClickCountry(
		     el.ico
	    );
    };

    onSelectGenres = (el) => {
	    let id = parseInt(el.id);
    	let newState = update(this.state.sortSettings, {$merge: {
			    genresListName: {id: id, name: el.name}
	    }});

	    this.setState({
		    sortSettings: {...newState},
		    genresListData: {
		    	id: id, name: el.name, status: id !== 0
		    }
	    });

	    this.props.onClickGenres(id);
    };

    onClickChangeDir = () => {
	    let newState = update(this.state.sortSettings, {$merge: {
			    SortDirection: !this.state.sortSettings.SortDirection
		    }});

	    this.setState({
		    sortSettings: {
			    ...newState
		    }
	    });
    };

    onClickAdult = () => {
	    let newState = update(this.state.sortSettings, {$merge: {
	         adult: !this.state.sortSettings.adult
	     }});

	     this.setState({
	         sortSettings: {
	             ...newState
	         }
	     });
    };

    onChangeRangeDate = (e) => {

	     let newState = update(this.state.sortSettings, {$merge: {
	         sortByDate: {
	             name: e.target.value,
	             date: e.target.value,
	             type: 'single',
	             status: true
	         }
	     }});

	     this.setState({
	         sortSettings: {
	             ...newState
	         }
	     });

    };

	 restoreDefaultState = () => {
	    this.setState({
		        sortSettings: {
			        genresListName: {
			            name: 'Все жанры',
					    id: 0,
					    status: false
				    },
				    sortBy: {
		                name: 'По популярности',
					    type: 'popularity',
					    status: false
				    },
				    sortByDate: {
		                name: 'Все года',
					    date: '',
					    type: 'single',
					    status: false
				    },
				    sortByCountry: {
			            name: 'Все страны',
					    ico: '',
					    status: false
				    },
				    SortDirection: false,
				        adult: false
				    },
			    genresListData: {
				    name: 'Все жанры',
				    id: 0
			    },
			    modalFilter: this.state.modalFilter
		    });
	 };

	 onOpenFilterModal = ()=> {
	    this.setState({modalFilter: !this.state.modalFilter});
	 };

	 closePopup = (e) =>{
	     if (e.target.className === 'popup-base' || e.target.className === 'popup__close') {
	         document.querySelector('.popup__content').classList.add('popup--is-hide');
	         setTimeout(()=> this.setState({modalFilter: false}), 500);
	     }
	 };

 render() {
	 const {sortSettings} = this.state;
	 if ( this.props.MobileFilter ) {
		 return (
		 	<Filters
			    safeFilter={this.props.safeFilter}
			    sortSettings={sortSettings}
			    modalFilter={this.state.modalFilter}
			    genres={this.props.genres}
			    sortListType={this.props.sortListType}
			    genresListData={this.state.genresListData}
			    sortByCountry={this.props.sortByCountry}
			    onClickGenres={this.onSelectGenres}
			    onSortByDate={this.onSortByDate}
			    onSortByCountry={this.onSortByCountry}
			    onClickSort={this.onClickSort}
			    onClickAdult={this.onClickAdult}
			    onClickChangeDir={this.onClickChangeDir}
			    restoreDefaultState={this.restoreDefaultState}
		    />
		 );
	 }
	 return (
	 	<FiltersMobile
		    safeFilter={this.props.safeFilter}
		    sortSettings={sortSettings}
		    modalFilter={this.state.modalFilter}
		    genres={this.props.genres}
		    sortListType={this.props.sortListType}
		    genresListData={this.state.genresListData}
		    sortByCountry={this.props.sortByCountry}
		    onClickGenres={this.onSelectGenres}
		    onSortByDate={this.onSortByDate}
		    onSortByCountry={this.onSortByCountry}
		    onClickSort={this.onClickSort}
		    restoreDefaultState={this.restoreDefaultState}
		    onOpenFilterModal={this.onOpenFilterModal}
		    onClickAdult={this.onClickAdult}
		    onClickChangeDir={this.onClickChangeDir}
		    closePopup={this.closePopup}
	    />
	 );

 }
}

export default (ListsPage);
