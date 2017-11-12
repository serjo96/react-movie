import React, {Component} from 'react';
import { movieTop } from '../../actions/movies-action';
import { connect } from 'react-redux';
import MovieList from './MoviesList';


class MoviesTop extends Component {
    componentDidMount() {
        this.sendRequest();
    }

 sendRequest = () =>{
     this.props.loadPlaying();
 };

 render() {
     let topMovies = this.props.TopMovies;
     return (
	     <main className="main">
             <div className="movies-content">
                <MovieList movieListTitle={'Топ фильмы'} movieList={topMovies}/>
                 <div className="pager-btns">
                     <div className="pager-btn pager-btn--prev title-link link-angle"><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div>
                     <div className="pager-btn pager-btn--next title-link link-angle"><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div>
                 </div>
             </div>
	     </main>
     );

 }
}

function mapStateToProps(state) {
    return {
        TopMovies: state.TopMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadPlaying: (page) => dispatch(movieTop())
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviesTop);
