import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { storageCountries } from '../../../store/localData';

import './filters.sass';
import FiltersMobile from '../components/FiltersMobile';
import Filters from '../components/Filters';

class FilterList extends Component {
  year = this.getUrlString.year ? this.getUrlString.year === '-1980' ? 'до ' + this.getUrlString.year.split('-').pop() : this.getUrlString.year : 'Все года';

  state = {
    genresListName: {
      name: 'Все жанры',
      id: 0,
      status: false
    },
    sortBy: {
      name: this.getUrlString.sort_by ? this.props.sortListType.filter(i => i.type === this.getUrlString.sort_by.split('.')[0]).pop().name : 'По популярности',
      type: this.getUrlString.sort_by ? this.getUrlString.sort_by.split('.')[0] : 'popularity',
      status: this.getUrlString.sort_by
    },
    sortByDate: {
      name: this.year,
      date: this.getUrlString.year ? this.getUrlString.year : '',
      type: 'single',
      status: !!this.getUrlString.year
    },
    sortByDateInput: '',
    sortByCountry: {
      name: this.getUrlString.country ? storageCountries.filter(i => i.ico === this.getUrlString.country).pop().name : 'Все страны',
      ico: this.getUrlString.country ? this.getUrlString.country : '',
      status: !!this.getUrlString.country
    },
    SortDirection: this.getUrlString.sort_by ? this.getUrlString.sort_by.split('.').pop() !== 'desc' : false,
    adult: this.getUrlString.adult,

    genresListData: {
      name: this.props.genresData[this.getUrlString.genre] || 'Все жанры',
      id: this.getUrlString.genre,
      status: !!this.getUrlString.genre
    },
    modalFilter: false
  };

  componentDidMount () {

  }

  get getUrlString () {
    return {
      genre: queryString.parse(this.props.location.search).genre,
      country: queryString.parse(this.props.location.search).country,
      sort_by: queryString.parse(this.props.location.search).sort_by,
      year: queryString.parse(this.props.location.search).year,
      page: queryString.parse(this.props.location.search).page,
      adult: queryString.parse(this.props.location.search).adult
    };
  }

  onSortLists = (el) => {
    const fullType = el.type + (this.state.SortDirection ? '.asc' : '.desc');

    this.setState({

      sortBy: {
        name: el.name, type: el.type, status: true
      }

    });

    const UrlObj = this.getUrlString;
    UrlObj.sort_by = fullType;

    this.props.history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  onClickChangeDir = () => {
    this.setState({

      SortDirection: !this.state.SortDirection

    }, () => {
      const UrlObj = this.getUrlString;
      UrlObj.sort_by = this.state.sortBy.type + (this.state.SortDirection ? '.asc' : '.desc');

      this.props.history.push({
        search: queryString.stringify(UrlObj)
      });
    });
  };

  onSortByDate = (el) => {
    this.setState({

      sortByDate: {
        name: el.name,
        date: el.date,
        type: el.type,
        status: el.date !== 'All'
      }

    });

    let startDate;
    let endDate;
    const UrlObj = this.getUrlString;

    if (el.type === 'range') {
      startDate = el.date.split('=')[0] ? new Date(el.date.split('=')[0]).getFullYear() : '';
      endDate = new Date(el.date.split('=')[1]).getFullYear();

      UrlObj.year = startDate + '-' + endDate;
    } else {
      UrlObj.year = el.date;
    }

    if (el.date === 'All') {
      delete UrlObj.year;
    }

    this.props.history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  onSortByCountry = (el) => {
    this.setState({

      sortByCountry: {
        name: el.name,
        ico: el.ico,
        status: el.ico !== 'All'
      }

    });

    const UrlObj = this.getUrlString;
    UrlObj.country = el.ico;

    if (el.ico === 'All') {
      delete UrlObj.country;
    }

    this.props.history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  onSelectGenres = (el) => {
    const id = +el.id;

    this.setState({
      genresListName: { id: id, name: el.name },
      genresListData: {
        id: id, name: el.name, status: id !== 0
      }
    });

    const UrlObj = this.getUrlString;
    UrlObj.genre = id;

    if (id === 0) {
      delete UrlObj.genre;
    }

    this.props.history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  onClickAdult = () => {
    this.setState({

      adult: !this.state.adult

    });

    const UrlObj = this.getUrlString;
    UrlObj.adult = !this.state.adult;

    if (this.getUrlString.adult) {
      delete UrlObj.adult;
    }

    this.props.history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  onChangeRangeDate = (e) => {
    if (e.target.value.length <= 4) {
      this.setState({
        sortByDateInput: e.target.value,
        sortByDate: {
          name: e.target.value,
          date: e.target.value,
          type: 'single',
          status: true
        }
      });

      if (+e.target.value >= 1910) {
        const UrlObj = this.getUrlString;
        UrlObj.year = +e.target.value;

        this.props.history.push({
          search: queryString.stringify(UrlObj)
        });
      }
    }
  };

  onBlur = (e) => {
    if (e.target.value.length < 4) {
      this.setState({
        sortByDateInput: ''
      });
    }
  };

  restoreDefaultState = () => {
    this.setState({

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
        date: 'All',
        type: 'single',
        status: false
      },
      sortByCountry: {
        name: 'Все страны',
        ico: 'All',
        status: false
      },
      SortDirection: false,
      adult: false,
      genresListData: {
        name: 'Все жанры',
        id: 0
      },
      modalFilter: this.state.modalFilter
    });

    this.props.history.push({
      search: queryString.stringify({})
    });
  };

  onOpenFilterModal = () => {
    this.setState({ modalFilter: !this.state.modalFilter });
  };

  closePopup = (e) => {
    if (e.target.className === 'popup-base' || e.target.className === 'popup__close') {
      document.querySelector('.popup__content').classList.add('popup--is-hide');
      setTimeout(() => this.setState({ modalFilter: false }), 500);
    }
  };

  render () {
    if (this.props.MobileFilter) {
      return (
        <Filters
          sortSettings={this.state}
          safeFilter={this.props.safeFilter}
          modalFilter={this.state.modalFilter}
          genres={this.props.genres}
          sortListType={this.props.sortListType}
          genresListData={this.state.genresListData}
          sortByCountry={this.props.sortByCountry}
          handlerClickGenres={this.onSelectGenres}
          onSortByDate={this.onSortByDate}
          onSortByCountry={this.onSortByCountry}
          onClickSort={this.onSortLists}
          onClickAdult={this.onClickAdult}
          onClickChangeDir={this.onClickChangeDir}
          onChangeRangeDate={this.onChangeRangeDate}
          onBlur={this.onBlur}
        />
      );
    }
    return (
      <FiltersMobile
        safeFilter={this.props.safeFilter}
        sortSettings={this.state}
        modalFilter={this.state.modalFilter}
        genres={this.props.genres}
        sortListType={this.props.sortListType}
        genresListData={this.state.genresListData}
        sortByCountry={this.props.sortByCountry}
        handlerClickGenres={this.onSelectGenres}
        onSortByDate={this.onSortByDate}
        onSortByCountry={this.onSortByCountry}
        onClickSort={this.onSortLists}
        restoreDefaultState={this.restoreDefaultState}
        onOpenFilterModal={this.onOpenFilterModal}
        onClickAdult={this.onClickAdult}
        onClickChangeDir={this.onClickChangeDir}
        closePopup={this.closePopup}
      />
    );
  }
}

FilterList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  genresData: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByCountry: PropTypes.bool,
  safeFilter: PropTypes.bool,
  MobileFilter: PropTypes.bool

};

// onClickSortList={this.sortList}
// onClickSortDate={this.onSortByDate}
// sortByCountry={true}
// safeFilter={true}
// sortListType={sortListType}
// MobileFilter={width >= 963}

export default (FilterList);
