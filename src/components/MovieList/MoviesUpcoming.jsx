import React, {Component} from 'react';
import { movieUpcoming } from '../../actions/movies-action';
import { connect } from 'react-redux';
import MovieList from './MoviesList';


class MovieUpcoming extends Component {
    componentDidMount() {
        this.sendRequest();
    }

 sendRequest = () =>{
     this.props.loadUpcoming();
 };

 render() {
     return (
         <main className="main">
             <div className="movies-content">
                <MovieList movieListTitle={'Скоро в кино'} movieList={this.props.UpcomingList}/>
             </div>
         </main>
     );

 }
}

function mapStateToProps(state) {
    return {
        UpcomingList: state.upcomingMovies
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadUpcoming: (page) => dispatch(movieUpcoming())
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieUpcoming);
