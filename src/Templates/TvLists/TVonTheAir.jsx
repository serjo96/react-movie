import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { tvOnTheAir } from '../../store/api/Tv.api';

import PageSwitcher from '@ui/Page-switcher/Page-switcher';
import { MoviesList } from '../MoviesList/components';
import ServiceBlock from './../Service/ServiceBlock';

class TVonTheAir extends Component {
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
   const { OnTheAirTv } = this.props;
   return (
     <main className='main main--media-list'>
       <Helmet>
         <title>Текущие сериалы</title>
       </Helmet>
       <ServiceBlock
         isLoading={OnTheAirTv.isFetching}
         isError={OnTheAirTv.status}
         fetch={this.sendRequest}
       >
         <div className='movies-content'>
           <MoviesList
             movieListTitle={`Текущие сериалы (${OnTheAirTv.data.total_results})`}
             movieList={OnTheAirTv}
             typeList='tv'
           />

           <PageSwitcher
             page={OnTheAirTv.data.page}
             totalPages={OnTheAirTv.data.total_pages}
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
    OnTheAirTv: state.TVs.OnTheAirTv
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadList: (page) => dispatch(tvOnTheAir(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVonTheAir);
