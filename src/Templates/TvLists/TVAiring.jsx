import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { tvAiring } from './../../Data/api/Tv.api';

import MediaList from './../MediaList/MediaList';
import ServiceBlock from './../Service/ServiceBlock';


class TVAiring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };

    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            // this.scrollToTop();
            this.sendRequest(prevProps);
        }
    }

    componentDidMount() {
	    // if (window.pageYOffset === 0) {
         //    clearInterval(this.state.intervalId);
	    // }
	    // this.scrollToTop();
        this.sendRequest();
    }

	get getUrlString() {
		return {
			genre: queryString.parse(this.props.location.search).genre,
			country: queryString.parse(this.props.location.search).country,
			sort_by: queryString.parse(this.props.location.search).sort_by,
			year: queryString.parse(this.props.location.search).year,
			page: queryString.parse(this.props.location.search).page,
			adult: queryString.parse(this.props.location.search).adult
		};
	}


	 sendRequest = () =>{
		 let page = +this.getUrlString.page;

		 let UrlStateObj = {
			 page: +this.getUrlString.page,
		 };

		 if (page) {
			 if (page <= 2) {
				 UrlStateObj.page += 1;
			 } else {
				 if (page <= 3) {
					 UrlStateObj.page += 2;
				 } else {
					 UrlStateObj.page += 3;
				 }
			 }
		 } else {
			 delete UrlStateObj.page;
		 }



		 this.props.loadList(UrlStateObj.page);
	 };

	 prevPage = () => {
		 let urlObj = this.getUrlString;

		 if (this.props.AiringTv.data.page <= 3) {
			 delete urlObj.page;
		 }

		 if (this.props.AiringTv.data.page === 5 ) {
			 urlObj.page = this.props.AiringTv.data.page - 3;
		 }

		 if ( this.props.AiringTv.data.page >= 7 ) {
			 urlObj.page = this.props.AiringTv.data.page - 4;
		 }

		 this.props.history.push({
			 search: queryString.stringify(urlObj)
		 });
	 };

	 nextPage = () => {
		 let urlObj = this.getUrlString;

		 // console.log(this.props.AiringTv.data.page);

		 if (this.props.AiringTv.data.page < 2) {
			 urlObj.page = this.props.AiringTv.data.page + 1;
		 }

		 if (this.props.AiringTv.data.page >= 3) {
			 urlObj.page = this.props.AiringTv.data.page;
		 }

		 console.log(urlObj.page);

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
     let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
     this.setState({ intervalId: intervalId });
 };

 render() {
	 let { AiringTv } = this.props;
     return (
         <main className="main main--media-list">
             <Helmet>
                 <title>Сейчас на тв</title>
             </Helmet>
	         <ServiceBlock isLoading={AiringTv.isFetching} isError={AiringTv.status} fetch={this.sendRequest}>
                 <div className="movies-content">
	                 <MediaList movieListTitle={`Сейчас на тв (${AiringTv.data.total_results})`} movieList={AiringTv} typeList='tv'/>
                     {AiringTv.data.total_pages > 1 ?
                         <div className="pager-btns clearfix">
                             {AiringTv.data.page - 1 > 1
	                             ? <div
		                             className="pager-btn pager-btn--prev link-angle link-angle--left"
		                             onClick={this.prevPage}>
		                             <i className="fa fa-angle-left" aria-hidden="true" />
		                             <span>Предыдущая страница</span>
	                             </div>
	                             : null}
                             {AiringTv.data.page + 1 < AiringTv.data.total_pages
	                             ? <div
		                             className="pager-btn pager-btn--next link-angle"
		                             onClick={this.nextPage}>
		                             <span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" />
	                             </div>
	                             : null}
                         </div> : null}
                 </div>
	         </ServiceBlock>
         </main>
     );
 }
}

function mapStateToProps(state) {
    return {
        AiringTv: state.TVs.airingTv
    };
}

const mapDispatchToProps = (dispatch) => ({
	loadList: (page) => dispatch(tvAiring(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(TVAiring);
