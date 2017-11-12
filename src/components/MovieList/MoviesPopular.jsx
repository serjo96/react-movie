import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { moviePopular } from '../../actions/movies-action';
import { connect } from 'react-redux';
import MovieList from './MoviesList';


class MoviesPopular extends Component {
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
        this.sendRequest();
    }

     sendRequest = () =>{
	     let movieId = parseFloat(this.props.location.search.split('=').pop());
	     if (this.props.location.search) {
		     this.props.loadUpcoming(movieId+2);
	     } else {
		     this.props.loadUpcoming();
	     }
     };

    prevPage = () => {
	    console.log(this.props.PopMovies.data.page);
	    if (this.props.PopMovies.data.page > 1) {
	        this.props.loadUpcoming(this.props.PopMovies.data.page-1);
	        this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page-1));
        } else {
		    this.props.loadUpcoming(this.props.PopMovies.data.page-2);
		    this.props.history.push('/movies/popular');
        }
    };

    nextPage = () => {
	    console.log(this.props.PopMovies.data.page);
	    if (this.props.PopMovies.data.page > 1) {
	        // this.props.loadUpcoming(this.props.PopMovies.data.page+2);
            this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page));

        } else {
            this.props.history.push('/movies/popular?page=' + (this.props.PopMovies.data.page+1));
	        // this.props.loadUpcoming(this.props.PopMovies.data.page+1);
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
	    return (
		    <main className="main">
			    <Helmet>
				    <title>Популярные фильмы</title>
			    </Helmet>
			    {this.props.PopMovies.isFetching ?
			    <div className="movies-content">
					    <MovieList movieListTitle={'Популярные фильмы'} movieList={this.props.PopMovies}/>
					    {this.props.PopMovies.data.total_pages > 1 ?
					    <div className="pager-btns clearfix">
						    {this.props.PopMovies.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
						    {this.props.PopMovies.data.page < this.props.PopMovies.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
					    </div> : null}
			    </div> : null}
		    </main>
	    );
 }
}

function mapStateToProps(state) {
    return {
        PopMovies: state.PopMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadUpcoming: (page) => dispatch(moviePopular(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesPopular);
