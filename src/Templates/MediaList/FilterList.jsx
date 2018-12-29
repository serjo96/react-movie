import React, { Component } from 'react';
import update from 'react-addons-update';
import { chunkArr } from '../../utils/utils';
import {storageCountries, popularCountries, sortBySingleDateList, sortByRangeDateList} from '../../Data/localData';
import FiltersMobile from './../Filters/FiltersMobile';


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
		        SortDerection: false,
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
		let fullType = this.state.sortSettings.sortBy.type + (this.state.sortSettings.SortDerection ? '.asc' : '.desc');
		this.props.onClickSortList(fullType, this.state.sortSettings);
	};

    onSortByDate = (el) =>{
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

    onSortByCountry = (el) =>{
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

	    this.props.onClickGenres({
		    type: 'country',
		    filterData: el.ico
	    });
    };

    onSelectGenres = (el) =>{
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

	    this.props.onClickGenres({
		    type: 'genre',
		    filterData: {id}
	    });

    };

 onClickChangeDir = () =>{
	    let newState = update(this.state.sortSettings, {$merge: {
			    SortDerection: !this.state.sortSettings.SortDerection
		    }});
	    this.setState({
		    sortSettings: {
			    ...newState
		    }
	    });
 };

 onClickAdult = () =>{
     let newState = update(this.state.sortSettings, {$merge: {
         adult: !this.state.sortSettings.adult
     }});
     this.setState({
         sortSettings: {
             ...newState
         }
     });
 };

 onChangeRangeDate = (e) =>{

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

    restoreDefaultState = () =>{
	    this.setState({sortSettings: {
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
			    SortDerection: false,
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

			 <div className="filter-list-container">
				 <div className="filter-list">
					 {this.props.genres.length > 0 ?
						 <div className={`genre-filter filter-item ${this.state.genresListData.status ? 'filter-item--active' : ''}`}>
							 <div className="filter-name">
								 <span>{this.state.genresListData.name}</span>
								 <i className="fa fa-angle-down" aria-hidden="true"/>
							 </div>
							 <div className="filter-item__catalog filter-item__catalog--genres">
								 {chunkArr(this.props.genres, 5).map(( el, indx ) =>
									 (<ul
										 className="filter-catalog-col"
										 key={indx}
									 >
										 {el.map(( item, index ) =>
											 (<li
												 className={`filter-catalog__item filter-genre ${this.state.genresListData.id === item.id
													 ? 'filter-catalog__item--active'
													 : ''}`}
												 id={item.id}
												 onClick={()=> this.onSelectGenres(item)}
												 key={index}
											 >
												 {item.name}
											 </li>)
										 )}
									 </ul>))}
							 </div>
						 </div> : null}

					 <div className={`filter-item  ${sortSettings.sortByDate.date !== ''
						 ? sortSettings.sortByDate.status
							 ? 'filter-item--active'
							 : ''
						 : ''}`}>
						 <div className="filter-name">
							 <span>{sortSettings.sortByDate.name}</span>
							 <i className="fa fa-angle-down" aria-hidden="true"/>
						 </div>
						 <div
							 className="filter-item__catalog filter-item__catalog--sort-date filter-item__catalog--col">
							 <div className="filter-catalog__list">
								 {sortBySingleDateList.map(( el, index ) =>
									 (<div
										 className={`filter-catalog__item ${sortSettings.sortByDate.date === el.date ? 'filter-catalog__item--active' : ''}`}
										 key={index}
										 onClick={() => this.onSortByDate(el)}
										 data-date={el.date}
									 >
										 {el.name}
									 </div>)
								 )}
							 </div>
							 <div className="filter-catalog__list">
								 <div className="filter-catalog__sub-title">Десятилетия</div>
								 {sortByRangeDateList.map(( el, index ) =>
									 (<div
										 className={`filter-catalog__item ${sortSettings.sortByDate.date === el.date ? 'filter-catalog__item--active' : ''}`}
										 key={index}
										 onClick={() => this.onSortByDate(el)}
										 data-date={el.date}
									 >
										 {el.name}
									 </div>))}
							 </div>
							 <div className="filter-catalog__list">
								 <div className="filter-catalog__sub-title">Своя дата</div>
								 <input type="text" className="filter-filed-date" onChange={this.onChangeRangeDate}/>
							 </div>
						 </div>
					 </div>

					 {this.props.sortByCountry ? <div
						 className={`filter-item ${sortSettings.sortByCountry.ico !== ''
							 ? sortSettings.sortByCountry.status
								 ? 'filter-item--active'
								 : ''
							 : ''}`}>
						 <div className="filter-name">
							 <span>{sortSettings.sortByCountry.name}</span>
							 <i className="fa fa-angle-down" aria-hidden="true"/>
						 </div>
						 <div className="filter-item__catalog filter-item__catalog--genres">
							 <div className="filter-catalog-col">
								 <div
									 className={`filter-catalog__item ${sortSettings.sortByCountry.ico === '' ? 'filter-catalog__item--active' : ''}`}
									 data-country=""
									 onClick={() => this.onSortByCountry({name: 'Все страны', ico: ''})}
								 >
									 Все страны
								 </div>
								 <div
									 className="filter-catalog__sub-title filter-catalog__sub-title--country">Популярное
								 </div>
								 <ul>
									 {popularCountries.map(( item, index ) =>
										 (<li
											 className={`filter-catalog__item ${sortSettings.sortByCountry.ico === item.ico
												 ? 'filter-catalog__item--active'
												 : ''}`}
											 key={index}
											 data-country={item.ico}
											 onClick={() => this.onSortByCountry(item)}
										 >
											 {item.name}
										 </li>)
									 )}
								 </ul>
							 </div>
							 {chunkArr(storageCountries, 10).map(( el, indx ) =>
								 (<ul
									 className="filter-catalog-col"
									 key={indx}
								 >
									 {el.map(( item, index ) =>
										 (<li
											 className={`filter-catalog__item ${sortSettings.sortByCountry.ico === item.ico
												 ? 'filter-catalog__item--active'
												 : ''}`}
											 key={index}
											 data-country={item.ico}
											 onClick={() => this.onSortByCountry(item)}
										 >
											 {item.name}
										 </li>)
									 )}
								 </ul>))}
						 </div>
					 </div> : null}

					 {this.props.safeFilter ?
						 <div className="filter-item filter-item--safe-filter" onClick={this.onClickAdult}>
							 <div className="filter-name">
								 <span>Безопасный фильтр</span>
								 <i className={`fa ${sortSettings.adult ? 'fa-square-o' : 'fa-check-square'}`}
								    aria-hidden="true"/>
							 </div>
						 </div> : null}

					 <div className={`filter-item ${sortSettings.sortBy.type !== 'popularity'
						 ? sortSettings.sortBy.status ? 'filter-item--active'
							 : ''
						 : ''}`}>
						 <div className="filter-name">
							 <span>{sortSettings.sortBy.name}</span>
							 <i className="fa fa-angle-down" aria-hidden="true"/>
						 </div>
						 <div className="filter-item__catalog filter-item__catalog--col sort-catalog">
							 <div className="filter-catalog__title">Сортировать</div>
							 {this.props.sortListType.map(( el, indx ) =>
								 (<div
									 onClick={()=>this.onClickSort(el)}
									 key={indx}
									 className={`filter-catalog__item sort-catalog-item ${sortSettings.sortBy.type === el.type
										 ? 'filter-catalog__item--active'
										 : ''}`}
								 >
									 {el.name}
								 </div>)
							 )}
						 </div>
					 </div>
					 <div className={`sort-direction ${sortSettings.SortDerection ? 'sort-direction--asc' : ''}`}>
						 <i onClick={this.onClickChangeDir}
						    className="fa fa-long-arrow-up" aria-hidden="true"/>
					 </div>
				 </div>
			 </div>
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
			    onClickSort={this.onClickSort}
			    restoreDefaultState={this.restoreDefaultState}
			    onOpenFilterModal={this.onOpenFilterModal}
			    closePopup={this.closePopup}
		    />

	    );
	 
 }
}

export default (ListsPage);
