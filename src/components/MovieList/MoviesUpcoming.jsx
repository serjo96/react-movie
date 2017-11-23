import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { movieUpcoming } from '../../actions/movies-action';
import { connect } from 'react-redux';
import MovieList from '../MediaList/MediaList';


class MovieUpcoming extends Component {
    componentDidMount() {
        this.sendRequest();
    }

 sendRequest = () =>{
     this.props.loadList();
 };

 render() {
     return (
         <main className="main">
             <Helmet>
                 <title>Ожидаемые фильмы</title>
             </Helmet>
             <div className="movies-content">
                <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList} typeList='movie'/>
             </div>
         </main>
     );

 }
}

function mapStateToProps(state) {
    return {
        UpcomingList: state.movies.upcomingMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
	loadList: (page) => dispatch(movieUpcoming(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieUpcoming);
