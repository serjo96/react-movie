import React, { Component } from 'react';
import update from 'react-addons-update';
import { chunkArr } from '../../utils/utils';
import Popup from '../../components/Popup/Popup';
import {storageCountries, popularCountries, sortBySingleDateList, sortByRangeDateList} from '../../Data/localData';


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
    }

    componentDidMount() {

        let genres =  this.props.location.search.match(/genre/g) ? parseInt(this.props.location.search.split(/-/).pop()) : '';
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
		    this.sortLists();
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
    };

    onClickGenres = (el) =>{
	    let id = parseInt(el.id);
    	let newState = update(this.state.sortSettings, {$merge: {
			    genresListName: {id: id, name: el.name}
	    }});


	    this.setState({
		    sortSettings: {...newState},
		    genresListData: {
		    	id: id, name: el.name, status: id === 0 ? false : true
		    }
	    });
	    this.props.onClickGenres(id);
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

	 sortLists = () =>{
	    let fullType = this.state.sortSettings.sortBy.type + (this.state.sortSettings.SortDerection? '.asc': '.desc');
	     this.props.SortList(fullType, this.state.sortSettings);
	 };

 closePopup = (e) =>{
     if (e.target.className === 'popup-base' || e.target.className === 'popup__close') {
         document.querySelector('.popup__content').classList.add('popup--is-hide');
         setTimeout(()=> this.setState({modalFilter: false}), 500);
     }
 };

 render() {
	 let {sortSettings} = this.state;

	 if ( this.props.MobileFilter ) {
		 return (

			 <div className="filter-list-container">
				 <div className="filter-list">

					 {this.props.genres.length > 0 ?
						 <div
							 className={`genre-filter filter-item ${this.state.genresListData.status ? 'filter-item--active' : ''}`}>
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
												 className={`filter-catalog__item filter-genre ${this.state.genresListData.id === item.id ? 'filter-catalog__item--active' : ''}`}
												 id={item.id}
												 onClick={()=> this.onClickGenres(item)}
												 key={index}
											 >
												 {item.name}
											 </li>)
										 )}
									 </ul>))}
							 </div>
						 </div> : null}

					 <div className={`filter-item  ${sortSettings.sortByDate.date !== '' ? sortSettings.sortByDate.status ? 'filter-item--active' : '' : ''}`}>
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
						 className={`filter-item ${sortSettings.sortByCountry.ico !== '' ? sortSettings.sortByCountry.status ? 'filter-item--active' : '' : ''}`}>
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
											 className={`filter-catalog__item ${sortSettings.sortByCountry.ico === item.ico ? 'filter-catalog__item--active' : ''}`}
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
											 className={`filter-catalog__item ${sortSettings.sortByCountry.ico === item.ico ? 'filter-catalog__item--active' : ''}`}
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

					 <div className={`filter-item ${sortSettings.sortBy.type !== 'popularity' ? sortSettings.sortBy.status ? 'filter-item--active' : '': ''}`}>
						 <div className="filter-name">
							 <span>{sortSettings.sortBy.name}</span>
							 <i className="fa fa-angle-down" aria-hidden="true"/>
						 </div>
						 <div className="filter-item__catalog filter-item__catalog--col sort-catalog">
							 <div className="filter-catalog__title">Сортировать</div>
							 {this.props.sortList.map(( el, indx ) =>
								 (<div
									 onClick={()=>this.onClickSort(el)}
									 key={indx}
									 className={`filter-catalog__item sort-catalog-item ${sortSettings.sortBy.type === el.type ? 'filter-catalog__item--active' : ''}`}
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

	 		<div>

			    <div className="mobile-filter-trigger link" onClick={()=> this.setState({modalFilter: !this.state.modalFilter})}>
				    <span>Настроить фильтры</span><i className="fa fa-filter" aria-hidden="true"/>
			    </div>

			    {this.state.modalFilter ?
		        <div className="popup-base" onClick={this.closePopup}>

				    <div className="popup">
					    <div className="popup__close" onClick={this.closePopup}/>
					    <Popup>

					    <div className="mobile-filter">
						    <h2 className="mobile-filter__title">Фильтровать список</h2>
						    {this.props.genres.length > 0 ?
							    <div className="mobile-filter__select">
								    <div className="mobile-filter-item__title">Жанр</div>
								    <div className="mobile-filter__name">
									    <span>{this.state.genresListData.name}</span>
									    <i className="fa fa-angle-down" aria-hidden="true"/>
								    </div>
								    <label className="mobile-filter__label">
									    <select name="" id="" onChange={(e)=> this.onClickGenres({
										    name: e.target.value,
										    id: e.target.options[e.target.selectedIndex].id
									    })}>
									    {this.props.genres.map(( el, indx ) =>
												    (<option
													    id={el.id}
													    key={indx}
												    >
													    {el.name}
												    </option>)
									    )}
									    </select>
								    </label>
							    </div> : null}

							    <div className="mobile-filter__select">
								    <div className="mobile-filter-item__title">Год</div>
								    <div className="mobile-filter__name">
									    <span>{sortSettings.sortByDate.name}</span>
									    <i className="fa fa-angle-down" aria-hidden="true"/>
								    </div>
								    <label className="mobile-filter__label" htmlFor="">
								    <select name="" id="" onChange={e=> this.onSortByDate({
									    name: e.target.value,
									    date: e.target.options[e.target.selectedIndex].dataset.date,
									    type: e.target.options[e.target.selectedIndex].dataset.type
								    })}>
									    {sortBySingleDateList.concat(sortByRangeDateList).map(( el, indx ) =>
										    (<option
											    key={indx}
											    value={el.date}
											    data-type={el.type}
											    data-date={el.date}
										    >
											    {el.name}
										    </option>)
									    )}
								    </select>
								    </label>
							    </div>

						    {this.props.sortByCountry ?<div className="mobile-filter__select">
							    <div className="mobile-filter-item__title">Стране</div>
							    <div className="mobile-filter__name">
								    <span>{sortSettings.sortByCountry.name}</span>
								    <i className="fa fa-angle-down" aria-hidden="true"/>
							    </div>
							    <label className="mobile-filter__label" htmlFor="">
								    <select name="" id="" onChange={e=> this.onSortByCountry({
									    name: e.target.value,
									    ico: e.target.options[e.target.selectedIndex].dataset.ico
								    })}>
									    <option value="">Все страны</option>
									    {storageCountries.map(( el, indx ) =>
										    (<option
											    key={indx}
											    value={el.name}
											    data-ico={el.ico}
										    >
											    {el.name}
										    </option>)
									    )}
								    </select>
							    </label>
						    </div>:null}

						    <div className="mobile-filter__select">
							    <div className="mobile-filter-item__title">Сортировать</div>
							    <div className="mobile-filter__name">
								    <span>{sortSettings.sortBy.name}</span>
								    <i className="fa fa-angle-down" aria-hidden="true"/>
							    </div>
							    <label className="mobile-filter__label" htmlFor="">
								    <select name="" id="" onChange={e=> this.onClickSort({
									    name: e.target.value,
									    type: e.target.options[e.target.selectedIndex].dataset.type
								    })}>
									    {this.props.sortList.map(( el, indx ) =>
										    (<option
											    key={indx}
											    value={el.name}
											    data-type={el.type}
										    >
											    {el.name}
										    </option>)
									    )}
								    </select>
							    </label>
						    </div>

						    <div onClick={this.onClickChangeDir} className={`mobile__sort-direction sort-direction ${sortSettings.SortDerection ? 'sort-direction--asc' : ''}`}>
                                     <span>{`Сортировать по ${sortSettings.SortDerection ? 'убыванию' : 'возрастанию'}`}</span>
							    <i className="fa fa-long-arrow-up" aria-hidden="true"/>
						    </div>

						    {this.props.safeFilter ?
							    <div className="mobile-filter__safeFiler" onClick={this.onClickAdult}>

								    <span>Безопасный фильтр</span>
								    <i className={`fa ${sortSettings.adult ? 'fa-square-o' : 'fa-check-square'}`}
								       aria-hidden="true"/>

							    </div> : null}

						    <div onClick={this.restoreDefaultState} className="restore-filters-btn">Сбросить все фильтры</div>

					        </div>
					    </Popup>
				    </div>
		        </div>: null}
		    </div>
	    );
	 
 }
}

export default (ListsPage);
