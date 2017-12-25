import React, { Component } from 'react';
import update from 'react-addons-update';
import { chunkArr } from '../../utils/utils';
import {storage, sortByDateList, sortList} from '../../Data/localData';


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
			        date: 0,
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
    	if(previousState.sortSettings !== this.state.sortSettings){
		    this.sortLists();
	    }

	}




	 onClickSort = (e) => {
		 let newState = update(this.state.sortSettings, {$merge:{
				 sortBy: {
					 name: e.target.innerHTML, type: e.target.dataset.type, status: true
				 }
			 }});
		 this.setState({
			 sortSettings: {
				 ...newState
			 }
		 });
	 };

    onSortByDate = (el) =>{
	    let newState = update(this.state.sortSettings, {$merge:{
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
	    let newState = update(this.state.sortSettings, {$merge:{
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

    onClickGenres = (e) =>{
    	let id = parseInt(e.target.id);
    	let newState = update(this.state.sortSettings, {$merge:{
			    genresListName: {id: id, name: e.target.innerHTML}
	    }});


	    this.setState({
		    sortSettings: {...newState},
		    genresListData: {
		    	id: id, name: e.target.innerHTML, status: id === 0 ? false : true
		    }
	    });
	    this.props.onClickGenres(id);
    };

	onClickChangeDir = () =>{
	    let newState = update(this.state.sortSettings, {$merge:{
			    SortDerection: !this.state.sortSettings.SortDerection
		    }});
	    this.setState({
		    sortSettings: {
			    ...newState
		    }
	    });
    };

	onClickAdult = () =>{
		let newState = update(this.state.sortSettings, {$merge:{
				adult: !this.state.sortSettings.adult
			}});
		this.setState({
			sortSettings: {
				...newState
			}
		});
	};

 sortLists = () =>{
 	let fullType = this.state.sortSettings.sortBy.type + (this.state.sortSettings.SortDerection? '.asc': '.desc');
     this.props.SortList(fullType, this.state.sortSettings);
 };

 render() {
	let {sortSettings} = this.state;


     return (

         <div className="filter-list">
	         {this.props.genres.isFetching &&
	         <div className={`genre-filter filter-item ${this.state.genresListData.status ? 'filter-item--active' : ''}`}>
                 <div className="filter-name">
                     <span>{this.state.genresListData.name}</span>
                     <i className="fa fa-angle-down" aria-hidden="true"/>
                 </div>
                 <div className="filter-item__catalog filter-item__catalog--genres">
                     {chunkArr(this.props.genres.data.arr.movieGenres, 5).map(( el, indx ) =>
                         (<ul
                             className="filter-catalog-col"
							    key={indx}
                         >
                             {el.map(( item, index ) =>
                                 (<li
                                     className={`filter-catalog__item filter-genre ${this.state.genresListData.id === item.id ? 'filter-catalog__item--active': ''}`}
                                     id={item.id}
                                     onClick={this.onClickGenres}
                                     key={index}
                                 >
                                     {item.name}
                                 </li>)
                             )}
                         </ul>))}
                 </div>
             </div>}
	         <div className={`filter-item  ${sortSettings.sortByDate.status ? 'filter-item--active' : ''}`}>
		         <div className="filter-name">
			         <span>{sortSettings.sortByDate.name}</span>
			         <i className="fa fa-angle-down" aria-hidden="true"/>
		         </div>
		         <div className="filter-item__catalog filter-item__catalog--col">
			         <div className="filter-catalog__title">Сортировать</div>
                     {sortByDateList.map((el, index)=>
                         <div
                             className={`filter-catalog__item ${sortSettings.sortByDate.date === el.date ? 'filter-catalog__item--active': ''}`}
                             key={index}
                             onClick={()=> this.onSortByDate(el)}
                             data-date={el.date}
                         >
	                         {el.name}
	                         </div>
                     )}
                 </div>
             </div>
	         <div className={`filter-item ${sortSettings.sortByCountry.status ? 'filter-item--active' : ''}`}>
		         <div className="filter-name">
			         <span>{sortSettings.sortByCountry.name}</span>
			         <i className="fa fa-angle-down" aria-hidden="true"/>
		         </div>
		         <div className="filter-item__catalog filter-item__catalog--genres">

                     {chunkArr(storage, 10).map(( el, indx ) =>
	                     (<ul
	                     className="filter-catalog-col"
	                     key={indx}
	                     >
	                     {el.map(( item, index ) =>
		                     (<li
                             className={`filter-catalog__item ${sortSettings.sortByCountry.ico === item.ico ? 'filter-catalog__item--active': ''}`}
                             key={index}
                             data-country={item.ico}
                             onClick={()=> this.onSortByCountry(item)}
                         >
	                         {item.name}
		                     </li>)
	                     )}
	                     </ul>))}
                 </div>
             </div>

	         <div onClick={this.onClickAdult}>
		         <div className="filter-name" >
			         <span>Безопасный фильтр</span>
			         <i className={`fa ${sortSettings.adult ? 'fa-square-o' : 'fa-check-square'}`} aria-hidden="true"/>
		         </div>
	         </div>

             <div className={`filter-item ${sortSettings.sortBy.status ? 'filter-item--active': ''}`}>
                 <div className="filter-name">
                     <span>{sortSettings.sortBy.name}</span>
                     <i className="fa fa-angle-down" aria-hidden="true"/>
                 </div>
                 <div className="filter-item__catalog filter-item__catalog--col sort-catalog">
                     <div className="filter-catalog__title">Сортировать</div>
                     {sortList.map((el, indx)=>
                         (<div
                             onClick={this.onClickSort}
                             key={indx}
                             className={`filter-catalog__item sort-catalog-item ${sortSettings.sortBy.type === el.type ? 'filter-catalog__item--active' :''}`}
                             data-type={el.type}
                         >
                             {el.name}
                         </div>)
                     )}
                 </div>
             </div>
             <div className={`sort-direction ${sortSettings.SortDerection ? 'sort-direction--asc' :''}`}>
	             <i onClick={this.onClickChangeDir}
	                className="fa fa-long-arrow-up" aria-hidden="true"/></div>
         </div>
     );
 }
}

export default (ListsPage);
