import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MovieList from '../MediaList/MediaList';
import { keywordsReq } from './../../Data/api/General.api';
import ServiceBlock from '../Service/ServiceBlock';

class KeywordsList extends Component {
  state = {
    top: 0
  };

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.scrollToTop();
      this.sendRequest(prevProps);
    }
  }

  componentDidMount () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.sendRequest();
  }

  sendRequest = () => {
    const pageNubmer = parseFloat(this.props.location.search.split('=').pop());
    const idRequest = this.props.match.params.id.split('-').pop();
    const typeRequest = this.props.match.url.match(/movie/) ? 'movie' : 'tv';

    if (this.props.location.search) {
      if (pageNubmer <= 2) {
        this.props.keywordsReq(idRequest, typeRequest, pageNubmer + 1);
      } else {
        if (pageNubmer <= 3) {
          this.props.keywordsReq(idRequest, typeRequest, pageNubmer + 2);
        } else {
          this.props.keywordsReq(idRequest, typeRequest, pageNubmer + 3);
        }
      }
    } else {
      this.props.keywordsReq(idRequest, typeRequest);
    }
  };

  prevPage = () => {
    const path = this.props.match.params.id;
    const typeRequest = 'movie';
    if (this.props.KeywordsListData.data.page > 1) {
      if (this.props.KeywordsListData.data.page <= 3) {
        this.props.history.push(`/lists/keywords_${typeRequest}/${path}`);
      } else {
        if (this.props.KeywordsListData.data.page >= 7) {
          this.props.history.push(`/lists/keywords_${typeRequest}/${path}/?page=${this.props.KeywordsListData.data.page - 4}`);
        } else {
          this.props.history.push(`/lists/keywords_${typeRequest}/${path}/?page=${this.props.KeywordsListData.data.page - 3}`);
        }
      }
    } else {
      this.props.history.push(`/lists/keywords_${typeRequest}/`);
    }
  };

  nextPage = () => {
    const path = this.props.match.params.id;
    const typeRequest = 'movie';
    if (this.props.KeywordsListData.data.page > 1) {
      if (this.props.KeywordsListData.data.page <= 3) {
        this.props.history.push(`/lists/keywords_${typeRequest}/${path}/?page=${this.props.KeywordsListData.data.page}`);
      } else {
        this.props.history.push(`/lists/keywords_${typeRequest}/${path}/?page=${this.props.KeywordsListData.data.page - 1}`);
      }
    } else {
      this.props.history.push(`/lists/keywords_${typeRequest}/${path}/?page=${this.props.KeywordsListData.data.page + 1}`);
    }
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
    const { KeywordsListData } = this.props;
    const titleSearch = this.props.match.params.id.split('-')[0].replace(/_/g, ' ');
    let typeRequest;
    if (this.props.match.url.match(/movie/)) {
      typeRequest = 'movie';
    } else {
      typeRequest = 'tv';
    }

    return (
      <div className='main'>
        <ServiceBlock isLoading={KeywordsListData.isFetching} isError={KeywordsListData.status.pageOne && KeywordsListData.status.pageTwo} fetch={this.sendRequest}>
          <Helmet>
            <title>{`Ключевое слово: ${titleSearch}`}</title>
          </Helmet>
          <div className='container'>
            <div className='search-results'>
              <MovieList movieListTitle={`Ключевое слово: ${titleSearch} (${KeywordsListData.data.total_results})`} movieList={KeywordsListData} typeList={typeRequest} />
              {KeywordsListData.data.total_pages > 1
                ? <div className='pager-btns clearfix'>
                  {KeywordsListData.data.page - 1 > 1 ? <div className='pager-btn pager-btn--prev link-angle link-angle--left' onClick={this.prevPage}><i className='fa fa-angle-left' aria-hidden='true' /><span>Предыдущая страница</span></div> : null}
                  {KeywordsListData.data.page + 1 < KeywordsListData.data.total_pages ? <div className='pager-btn pager-btn--next link-angle' onClick={this.nextPage}><span>Следующая страница</span><i className='fa fa-angle-right' aria-hidden='true' /></div> : null}
                </div> : null}
            </div>
          </div>
        </ServiceBlock>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  keywordsReq: (id, type, page) => dispatch(keywordsReq(id, type, page))
});

function mapStateToProps (state) {
  return {
    KeywordsListData: state.General.KeywordsList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsList);
