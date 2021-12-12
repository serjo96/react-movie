import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { onLoadCompanyData, LoadCompanyMovies } from '../../store/api/Company.api';
import { clearCompanyData } from '../../store/actions/company-actions';

import NoImg from 'images/NoImg.png';
import ServiceBlock from './../Service/ServiceBlock';
import { MoviesList } from '../MoviesList/components';

class Person extends Component {
  state = {
    intervalId: 0
  };

  componentDidMount () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    this.props.loadCompanyData(this.props.match.params.id.split('-').pop());
    this.sendRequest();
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.loadCompanyData(this.props.match.params.id.split('-').pop());
      this.sendRequest();
      this.scrollToTop();
    }
  }

  componentWillUnmount () {
    this.props.clearPersonData();
  }

  sendRequest = () => {
    const companyID = this.props.match.params.id.split('-').pop();
    const page = parseFloat(this.props.location.search.split('=').pop());
    if (this.props.location.search) {
      if (page <= 2) {
        this.props.loadList(companyID, page + 1);
      } else {
        if (page <= 3) {
          this.props.loadList(companyID, page + 2);
        } else {
          this.props.loadList(companyID, page + 3);
        }
      }
    } else {
      this.props.loadList(companyID);
    }
  };

  prevPage = () => {
    const path = this.props.match.params.id;
    if (this.props.companyMovies.data.page > 1) {
      if (this.props.companyMovies.data.page <= 3) {
        this.props.history.push(`/company/${path}`);
      } else {
        if (this.props.companyMovies.data.page >= 7) {
          this.props.history.push(`/company/${path}/?page=${this.props.companyMovies.data.page - 4}`);
        } else {
          this.props.history.push(`/company/${path}/?page=${this.props.companyMovies.data.page - 3}`);
        }
      }
    } else {
      this.props.history.push(`/company/${path}`);
    }
  };

  nextPage = () => {
    const path = this.props.companyMovies.data.page > 1 ? this.props.location.search.substring(this.props.location.search.lastIndexOf('?') + 1, this.props.location.search.lastIndexOf('%')) : this.props.match.params.id;
    if (this.props.companyMovies.data.page > 1) {
      if (this.props.companyMovies.data.page <= 3) {
        this.props.history.push(`/company/${path}/?page=${this.props.companyMovies.data.page}`);
      } else {
        this.props.history.push(`/company/${path}/?page=${this.props.companyMovies.data.page - 1}`);
      }
    } else {
      this.props.history.push(`/company/${path}/?page=${this.props.companyMovies.data.page + 1}`);
    }
  };

  onClickImg = (e) => {
    this.setState({
      imgIndex: e.target.dataset.index,
      lightBox: !this.state.lightBox
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
    const { companyData, companyMovies } = this.props;

    return (
      <div className='main main--media-list'>
        <div className='movies-content company'>
          <ServiceBlock
            isLoading={companyData.isFetching && companyMovies.isFetching}
            isError={companyData.status && companyMovies.status.pageOne && companyMovies.status.pageTwo}
            fetch={this.sendRequest}
          >
            <Helmet>
              <title>{companyData.data.name}</title>
            </Helmet>

            <div className='company__data'>
              <div className='company__img'>
                <img src={companyData.data.logo_path ? `https://image.tmdb.org/t/p/w185/${companyData.data.logo_path}` : NoImg} alt='' />
              </div>
              <div className='company__info'>
                <h1 className='person-name'>{companyData.data.name}</h1>
                <p className='company__description'>{companyData.data.description > 0 ? companyData.data.description : 'К сожалению, на данный момент нет описания данной компании.'}</p>
                <div className='company__city'>{companyData.data.headquarters ? `Местораположение компании - ${companyData.data.headquarters}` : ''}</div>
                <div className='company__parent'>{companyData.data.parent_company ? `Родительская компания - ${companyData.data.parent_company}` : ''}</div>
                <div className='company__links'>
                  {companyData.data.homepage && <a target='_blank' href={companyData.data.homepage} className='social-link'>Домашняя страница</a>}
                </div>
              </div>

            </div>

            <MoviesList
              movieListTitle={`Всего фильмов (${companyMovies.data.total_results})`}
              movieList={companyMovies}
              typeList='movie'
            />
            {companyMovies.data.total_pages > 1 &&
              <div className='pager-btns clearfix'>
                {companyMovies.data.page - 1 > 1 &&
                  <div
                    className='pager-btn pager-btn--prev link-angle link-angle--left'
                    onClick={this.prevPage}
                  >
                    <i className='fa fa-angle-left' aria-hidden='true' />
                    <span>Предыдущая страница</span>
                  </div>}
                {companyMovies.data.page + 1 < companyMovies.data.total_pages &&
                  <div
                    className='pager-btn pager-btn--next link-angle'
                    onClick={this.nextPage}
                  >
                    <span>Следующая страница</span>
                    <i className='fa fa-angle-right' aria-hidden='true' />
                  </div>}
              </div>}
          </ServiceBlock>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    companyData: state.Company.companyData,
    companyMovies: state.Company.companyMovies
  };
}

const mapDispatchToProps = (dispatch) => ({

  loadList: (id, page) => dispatch(LoadCompanyMovies(id, page)),
  clearPersonData: () => dispatch(clearCompanyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
