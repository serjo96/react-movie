import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { movieUpcoming } from '../../actions/movies-actions';
import { connect } from 'react-redux';
import MovieList from '../../components/MediaList/MediaList';
import ServiceBlock from '../../components/Service/ServiceBlock';


class MovieUpcoming extends Component {
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
		if (this.props.UpcomingList.data.page > 1) {
			if (this.props.UpcomingList.data.page <= 3) {
				this.props.history.push('/movies/upcoming');
			} else {
				this.props.history.push('/movies/upcoming?page=' + (this.props.UpcomingList.data.page-5));
			}
		} else {
			this.props.history.push('/movies/upcoming');
		}
	};

	nextPage = () => {
		if (this.props.UpcomingList.data.page > 1) {
			if (this.props.UpcomingList.data.page <= 3) {
				this.props.history.push('/movies/upcoming?page=' + (this.props.UpcomingList.data.page));
			} else {
				this.props.history.push('/movies/upcoming?page=' + (this.props.UpcomingList.data.page-1));
			}
		} else {
			this.props.history.push('/movies/upcoming?page=' + (this.props.UpcomingList.data.page+1));
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
	 let { UpcomingList } = this.props;
     return (
         <main className="main main--media-list">
             <Helmet>
                 <title>Ожидаемые фильмы</title>
             </Helmet>
	         <ServiceBlock isLoading={UpcomingList.isFetching} isError={UpcomingList.status} fetch={this.sendRequest}>
	             <div className="movies-content">
	                <MovieList movieListTitle={`Скоро в кино (${this.props.UpcomingList.data.total_results})`} movieList={this.props.UpcomingList} typeList='movie'/>
		             {UpcomingList.data.total_pages > 1 ?
			             <div className="pager-btns clearfix">
				             {UpcomingList.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle link-angle--left" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
				             {UpcomingList.data.page+1 < UpcomingList.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
			             </div> : null}
	             </div>
	         </ServiceBlock>
         </main>
     );

 }
}

function mapStateToProps(state) {
    return {
        UpcomingList: state.Movies.upcomingMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
	loadList: (page) => dispatch(movieUpcoming(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieUpcoming);
