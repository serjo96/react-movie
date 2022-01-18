import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { changeMediaPage } from '~/store/actions/tv-actions';
import { tvPopular } from '~/store/api/tv.api';
import { sortListTV } from '~/store/localData';

import { MoviesList } from '~/templates/moviesList/components';
import FilterList from '~/templates/Filters/containers/FilterList.jsx';
import ServiceBlock from '~/templates/Service/ServiceBlock';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';

class TvPopular extends Component {
  state = {
    intervalId: 0
  };

  get genresData () {
    return this.props.genres.isFetching ? this.props.genres.data.obj : {};
  }

  get genres () {
    return this.props.genres.isFetching ? this.props.genres.data.arr.AllGenres : [];
  }

  componentDidUpdate (prevProps, previousState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.scrollToTop();
      this.sendRequest(prevProps);
    } else if (previousState.sortSettings !== this.state.sortSettings) {
      this.sendRequest();
    }
  }

  componentDidMount () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.scrollToTop();
    this.sendRequest();
  }

  get getUrlObjectState () {
    return {
      genre: queryString.parse(this.props.location.search).genre,
      sort_by: queryString.parse(this.props.location.search).sort_by,
      year: queryString.parse(this.props.location.search).year,
      page: queryString.parse(this.props.location.search).page
    };
  }

  sendRequest = () => {
    const page = +this.getUrlObjectState.page;
    const UrlStateObj = {
      page: +this.getUrlObjectState.page,
      genres: this.getUrlObjectState.genre,
      sort_by: this.getUrlObjectState.sort_by,
      year: this.getUrlObjectState.year
    };

    if (!page) {
      delete UrlStateObj.page;
    }

    if (page <= 2) {
      UrlStateObj.page += 1;
    } else if (page === 3) {
      UrlStateObj.page += 2;
    } else if (page >= 4) {
      UrlStateObj.page = UrlStateObj.page + UrlStateObj.page - 1;
    }

    console.log(UrlStateObj.sort_by);

    this.props.loadList(UrlStateObj.page, UrlStateObj.genres, UrlStateObj.sort_by, UrlStateObj.year);
  };

  prevPage = () => {
    const urlObj = this.getUrlObjectState;
    this.props.changeListFetchStatus('allTV');

    if (this.getUrlObjectState.page > 2) {
      urlObj.page = +this.getUrlObjectState.page - 1;
    }

    if (this.getUrlObjectState.page <= 2) {
      delete urlObj.page;
    }

    this.props.history.push({
      search: queryString.stringify(urlObj)
    });
  };

  nextPage = () => {
    const urlObj = this.getUrlObjectState;
    this.props.changeListFetchStatus('allTV');

    urlObj.page = 2;

    if (this.getUrlObjectState.page >= 2) {
      urlObj.page = +this.getUrlObjectState.page + 1;
    }

    this.props.history.push({
      search: queryString.stringify(urlObj)
    });
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  };

  scrollToTop = () => {
    const intervalId = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({ intervalId: intervalId });
  };

  render () {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const { allTV } = this.props;
    return (
      <main className='main main--media-list'>
        <Helmet>
          <title>Популярные сериалы</title>
        </Helmet>

        <ServiceBlock
          isLoading={allTV.isFetching}
          isError={allTV.status}
          fetch={this.sendRequest}
        >

          <div className='movies-content'>
            <FilterList
              location={this.props.location}
              genresData={this.genresData}
              genres={this.genres}
              sortByCountry={false}
              safeFilter={false}
              sortListType={sortListTV}
              MobileFilter={width >= 963}
              history={this.props.history}
            />

            <MoviesList
              movieListTitle={`Всего сериалов (${allTV.data.total_results})`}
              movieList={allTV}
              typeList='tv'
            />

            <PageSwitcher
              totalPages={allTV.data.total_pages}
              page={allTV.data.page}
              prevPage={this.prevPage}
              handleNextPage={this.nextPage}
            />

          </div>
        </ServiceBlock>
      </main>
    );
  }
}

function mapStateToProps (state) {
  return {
    allTV: state.TVs.allTV,
    genres: state.General.genres
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadList: (page, genre, sortType, date) => dispatch(tvPopular(page, genre, sortType, date)),
  changeListFetchStatus: () => dispatch(changeMediaPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(TvPopular);
