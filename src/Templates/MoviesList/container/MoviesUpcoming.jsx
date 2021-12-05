import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { movieUpcoming } from '../../../store/api/Movies.api';

import { MoviesList } from '../components';
import ServiceBlock from '../../Service/ServiceBlock';
import PageSwitcher from '@ui/Page-switcher/Page-switcher';

class MovieUpcoming extends Component {
  state = {
    intervalId: 0
  };

  componentDidMount () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.scrollToTop();
    this.sendRequest();
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.scrollToTop();
      this.sendRequest(prevProps);
    }
  }

  get getUrlObjectState () {
    return {
      page: queryString.parse(this.props.location.search).page
    };
  }

  sendRequest = () => {
    const page = +this.getUrlObjectState.page;
    const UrlStateObj = {
      page: +this.getUrlObjectState.page
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

    this.props.loadList(UrlStateObj.page);
  };

  prevPage = () => {
    const urlObj = this.getUrlObjectState;

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
    const { UpcomingList } = this.props;
    return (
      <main className='main main--media-list'>
        <Helmet>
          <title>Ожидаемые фильмы</title>
        </Helmet>
        <ServiceBlock
          isLoading={UpcomingList.isFetching}
          isError={UpcomingList.status}
          fetch={this.sendRequest}
        >
          <div className='movies-content'>
            <MoviesList
              movieListTitle={`Скоро в кино (${this.props.UpcomingList.data.total_results})`}
              movieList={this.props.UpcomingList}
              typeList='movie'
            />
            <PageSwitcher
              totalPages={UpcomingList.data.total_pages}
              page={UpcomingList.data.page}
              handlePrevPage={this.prevPage}
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
    UpcomingList: state.Movies.upcomingMovies
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadList: (page) => dispatch(movieUpcoming(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieUpcoming);
