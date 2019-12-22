import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { tvAiring } from './../../Data/api/Tv.api';

import MediaList from './../MediaList/MediaList';
import ServiceBlock from './../Service/ServiceBlock';
import { PageSwitcher } from '../../ui-components/Page-switcher/Page-switcher';

class TVAiring extends Component {
  state = {
    intervalId: 0
  };

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      // this.scrollToTop();
      this.sendRequest(prevProps);
    }
  }

  componentDidMount () {
    // if (window.pageYOffset === 0) {
    //    clearInterval(this.state.intervalId);
    // }
    // this.scrollToTop();
    this.sendRequest();
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
    const { AiringTv } = this.props;
    return (
      <main className='main main--media-list'>
        <Helmet>
          <title>Сейчас на тв</title>
        </Helmet>
        <ServiceBlock
          isLoading={AiringTv.isFetching}
          isError={AiringTv.status}
          fetch={this.sendRequest}
        >
          <div className='movies-content'>
            <MediaList
              movieListTitle={`Сейчас на тв (${AiringTv.data.total_results})`}
              movieList={AiringTv}
              typeList='tv'
            />
            <PageSwitcher
              total_pages={AiringTv.data.total_pages}
              page={AiringTv.data.page}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
            />
          </div>
        </ServiceBlock>
      </main>
    );
  }
}

function mapStateToProps (state) {
  return {
    AiringTv: state.TVs.airingTv
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadList: (page) => dispatch(tvAiring(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVAiring);
