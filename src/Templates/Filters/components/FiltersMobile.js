import React, { Component } from 'react';
import { sortByRangeDateList, sortBySingleDateList, storageCountries } from '../../../Data/localData';
import Popup from '../../Popup/Popup';

export default class FiltersMobile extends Component {
    render() {
	    const {sortSettings} = this.props;
        return (
            <div>

                <div className="mobile-filter-trigger link" onClick={this.props.onOpenFilterModal}>
                    <span>Настроить фильтры</span>
                    <i className="fa fa-filter" aria-hidden="true"/>
                </div>

                {this.props.modalFilter ?

                    <Popup
                        closePopup={this.props.closePopup}
                    >

                        <div className="mobile-filter">
                            <h2 className="popup__title">Фильтровать список</h2>
                            {this.props.genres.length > 0 ?
                                <div className="mobile-filter__select">
                                    <div className="mobile-filter-item__title">Жанр</div>
                                    <div className="mobile-filter__name">
                                        <span>{this.props.genresListData.name}</span>
                                        <i className="fa fa-angle-down" aria-hidden="true"/>
                                    </div>
                                    <label className="mobile-filter__label">
                                        <select name="" id="" onChange={(e)=> this.props.onClickGenres({
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
                                    <select name="" id="" onChange={e=> this.props.onSortByDate({
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

                            {this.props.sortByCountry ? <div className="mobile-filter__select">
                                <div className="mobile-filter-item__title">Стране</div>
                                <div className="mobile-filter__name">
                                    <span>{sortSettings.sortByCountry.name}</span>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                                <label className="mobile-filter__label" htmlFor="">
                                    <select name="" id="" onChange={e=> this.props.onSortByCountry({
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
                            </div> : null}

                            <div className="mobile-filter__select">
                                <div className="mobile-filter-item__title">Сортировать</div>
                                <div className="mobile-filter__name">
                                    <span>{sortSettings.sortBy.name}</span>
                                    <i className="fa fa-angle-down" aria-hidden="true"/>
                                </div>
                                <label className="mobile-filter__label" htmlFor="">
                                    <select name="sortBy" id="" onChange={e=> this.props.onClickSort({
                                        name: e.target.value,
                                        type: e.target.options[e.target.selectedIndex].dataset.type
                                    })}>
                                        {this.props.sortListType.map(( el, indx ) =>
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

                            <div onClick={this.props.onClickChangeDir} className={`mobile__sort-direction sort-direction ${sortSettings.SortDirection
                                ? 'sort-direction--asc'
                                : ''}`}>
                                <span>{`Сортировать по ${sortSettings.SortDirection
	                                     ? 'убыванию'
	                                     : 'возрастанию'}`}</span>
                                <i className="fa fa-long-arrow-up" aria-hidden="true"/>
                            </div>

                            {this.props.safeFilter ?
                                <div
                                    className="mobile-filter__safeFiler"
                                    onClick={this.props.onClickAdult}
                                >
                                    <span>Безопасный фильтр</span>
                                    <i
                                        className={`fa ${sortSettings.adult
                                            ? 'fa-square-o'
                                            : 'fa-check-square'}`}
                                        aria-hidden="true"
                                    />
                                </div>
                                : null}

                            <div
                                onClick={this.props.restoreDefaultState}
                                className="restore-filters-btn">
                                Сбросить все фильтры
                            </div>

                        </div>
                    </Popup>
                    : null}
            </div>
        );
    }
}
