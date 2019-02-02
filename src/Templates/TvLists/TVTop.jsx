import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { PageSwitcher } from '../../ui-components/Page switching/Page-switcher';

import { tvTop } from './../../Data/api/Tv.api';

import MediaList from './../MediaList/MediaList';
import ServiceBlock from './../Service/ServiceBlock';


class TvTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };
    }


    componentDidMount() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
	    this.scrollToTop();
        this.sendRequest();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
            this.sendRequest(prevProps);
        }
    }

    get getUrlObjectState() {
        return {
            page: queryString.parse(this.props.location.search).page
        };
    }


 sendRequest = () =>{
     let page = +this.getUrlObjectState.page;
     let UrlStateObj = {
         page: +this.getUrlObjectState.page
     };


     if (!page) {
         delete UrlStateObj.page;
     }

     if (page <= 2) {
         UrlStateObj.page += 1;
     } else if (page === 3) {
         UrlStateObj.page += 2;
     } else if ( page >= 4) {
         UrlStateObj.page = UrlStateObj.page + UrlStateObj.page - 1;
     }

     this.props.loadList(UrlStateObj.page);
 };

 prevPage = () => {
     let urlObj = this.getUrlObjectState;

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
     let urlObj = this.getUrlObjectState;

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
	     let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
	     this.setState({ intervalId: intervalId });
	 };

  render() {
      let { TopTv } = this.props;
      return (
	     <main className="main main--media-list">
              <Helmet>
                  <title>Топ сериалы</title>
              </Helmet>
		     <ServiceBlock
			     isLoading={TopTv.isFetching}
			     isError={TopTv.status}
			     fetch={this.sendRequest}
		     >
			     <div className="movies-content">
                      <MediaList
	                      movieListTitle={'Топ сериалы'}
	                      movieList={TopTv}
	                      typeList="tv"
                      />

				     <PageSwitcher
					     total_pages={TopTv.data.total_pages}
					     page={TopTv.data.page}
					     prevPage={this.prevPage}
					     nextPage={this.nextPage}
				     />
                  </div>
		     </ServiceBlock>
	     </main>
      );

  }
}

function mapStateToProps(state) {
    return {
        TopTv: state.TVs.TopTv
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadList: (page) => dispatch(tvTop(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(TvTop);
