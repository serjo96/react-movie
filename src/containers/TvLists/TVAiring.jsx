import React, {Component} from 'react';
import { tvAiring } from '../../actions/tv-actions';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import MediaList from '../../components/MediaList/MediaList';
import ServiceBlock from '../../components/Service/ServiceBlock';


class TVAiring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
            this.sendRequest(prevProps);
        }
    }

    componentDidMount() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
	    this.scrollToTop();
        this.sendRequest();
    }


	 sendRequest = () =>{
		 let movieId = parseFloat(this.props.location.search.split('=').pop());
		 if (this.props.location.search) {
			 if(movieId <= 2){
				 this.props.loadList(movieId+1);
			 } else{
				 if(movieId <= 3) {
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
		 if (this.props.AiringTv.data.page > 1) {
			 if (this.props.AiringTv.data.page <= 3) {
				 this.props.history.push('/tv/airing');
			 } else {
				 if (this.props.TopMovies.data.page >= 7) {
					 this.props.history.push('/tv/airing?page=' + (this.props.TopMovies.data.page-4));
				 } else {
					 this.props.history.push('/tv/airing?page=' + (this.props.TopMovies.data.page-3));
				 }

			 }
		 } else {
			 this.props.history.push('/tv/airing');
		 }
	 };

	 nextPage = () => {
	     if (this.props.AiringTv.data.page > 1) {
	         if (this.props.AiringTv.data.page <= 3) {
	             this.props.history.push('/tv/airing?page=' + (this.props.AiringTv.data.page));
	         } else {
	             this.props.history.push('/tv/airing?page=' + (this.props.AiringTv.data.page-1));
	         }
	     } else {
	         this.props.history.push('/tv/airing?page=' + (this.props.AiringTv.data.page+1));
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
	 let { AiringTv } = this.props;
     return (
         <main className="main main--media-list">
             <Helmet>
                 <title>Сейчас на тв</title>
             </Helmet>
	         <ServiceBlock isLoading={AiringTv.isFetching} isError={AiringTv.status.pageOne && AiringTv.status.pageTwo} fetch={this.sendRequest}>
                 <div className="movies-content">
	                 <MediaList movieListTitle={`Сейчас на тв (${AiringTv.data.total_results})`} movieList={AiringTv} typeList='tv'/>
                     {AiringTv.data.total_pages > 1 ?
                         <div className="pager-btns clearfix">
                             {AiringTv.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
                             {AiringTv.data.page+1 < AiringTv.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
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
