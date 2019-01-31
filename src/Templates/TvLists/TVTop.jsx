import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

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

	 sendRequest = () =>{
		 let movieId = parseFloat(this.props.location.search.split('=').pop());
		 if (this.props.location.search) {
			 if (movieId <= 2) {
				 this.props.loadList(movieId+1);
			 } else {
				 if (movieId <= 3) {
					 this.props.loadList(movieId + 2);
				 } else {
					 this.props.loadList(movieId + 3);
				 }
			 }
		 } else {
			 this.props.loadList();
		 }
	 };

	 prevPage = () => {
	     if (this.props.TopTv.data.page > 1) {
		     if (this.props.TopTv.data.page <= 3) {
			     this.props.history.push('/tv/top');
		     } else {
			     if (this.props.TopTv.data.page >= 7) {
		            this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page-4));
			     } else {
				     this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page-3));
			     }
	         }
	     } else {
	         this.props.history.push('/tv/top');
	     }
	 };

	 nextPage = () => {
	     if (this.props.TopTv.data.page > 1) {
	         if (this.props.TopTv.data.page <= 3) {
	             this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page));
	         } else {
	             this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page-1));
	         }
	     } else {
	         this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page+1));
	     }
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
		     <ServiceBlock isLoading={TopTv.isFetching} isError={TopTv.status} fetch={this.sendRequest}>

			     <div className="movies-content">
                      <MediaList movieListTitle={'Топ сериалы'} movieList={TopTv} typeList='tv'/>
	             {TopTv.data.total_pages > 1 ?
                          <div className="pager-btns clearfix">
			             {TopTv.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
			             {TopTv.data.page+1 < TopTv.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
                          </div> : null}
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
