import React, { Component } from 'react';
import update from 'react-addons-update';

import FiltersMobile from '../components/FiltersMobile';
import Filters from '../components/Filters';


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
	    this.stringParse = (new URL(document.location)).searchParams;
    }

    componentDidMount() {
        let genres =  this.stringParse.get('genre') ? parseInt(this.stringParse.get('genre')) : '';

        this.setState({
	        genresListData: {
		        name: this.props.genresData[genres] || 'Все жанры',
		        id: genres,
		        status: genres
	        }
        });
    }

    componentDidUpdate(_, previousState) {
    	if (previousState.sortSettings !== this.state.sortSettings) {
		    this.onSortLists();
	    }
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
		    	id: id, name: el.name, status: id === 0
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
