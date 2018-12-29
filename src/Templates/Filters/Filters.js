import React, { Component } from 'react';
import { chunkArr } from '../../utils/utils';
import {storageCountries, popularCountries, sortBySingleDateList, sortByRangeDateList} from '../../Data/localData';

export default class FiltersMobile extends Component {
    render() {
        const {sortSettings} = this.props;

        return (
            <div className="filter-list-container">
                <div className="filter-list">
                    {this.props.genres.length > 0 ?
                        <div className={`genre-filter filter-item ${this.props.genresListData.status ? 'filter-item--active' : ''}`}>
                            <div className="filter-name">
                                <span>{this.props.genresListData.name}</span>
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
                                                className={`filter-catalog__item filter-genre ${this.props.genresListData.id === item.id
                                                    ? 'filter-catalog__item--active'
                                                    : ''}`}
                                                id={item.id}
                                                onClick={()=> this.props.onClickGenres(item)}
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
                                        onClick={() => this.props.onSortByDate(el)}
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
                                        onClick={() => this.props.onSortByDate(el)}
                                        data-date={el.date}
                                    >
                                        {el.name}
                                    </div>))}
                            </div>
                            <div className="filter-catalog__list">
                                <div className="filter-catalog__sub-title">Своя дата</div>
                                <input
                                    type="text"
                                    className="filter-filed-date"
                                    onChange={this.props.onChangeRangeDate}
                                />
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
                                    onClick={() => this.props.onSortByCountry({name: 'Все страны', ico: ''})}
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
                                            onClick={() => this.props.onSortByCountry(item)}
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
                                            onClick={() => this.props.onSortByCountry(item)}
                                        >
                                            {item.name}
                                        </li>)
                                    )}
                                </ul>))}
                        </div>
                    </div> : null}

                    {this.props.safeFilter ?
                        <div className="filter-item filter-item--safe-filter" onClick={this.props.onClickAdult}>
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
                                    onClick={()=>this.props.onClickSort(el)}
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
                        <i onClick={this.props.onClickChangeDir}
						   className="fa fa-long-arrow-up" aria-hidden="true"/>
                    </div>
                </div>
            </div>
        );
    }
}
