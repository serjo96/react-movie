import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { urlRusLat } from '../../utils/utils';
import MovieInfo from '../Popup/MovieInfo';


class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false
        };
        this.el = null;
    }

 outItem = (e) => {
     this.setState({
         popup: true
     });
 };

 leaveItem = (e) => {
     this.setState({
         popup: false
     });
 };


 render() {
     return (
         <div className="movie-item movie-loading" id={this.props.id} onMouseEnter={this.outItem} onMouseLeave={ this.leaveItem} ref={el=> this.el = el} onLoad={e=> e.target.closest('.movie-item').classList.remove('movie-loading')}>
             <div className="movie-item__data">
                 <Link to={'/movie/' + urlRusLat(this.props.title) + '-' + this.props.id}>
                     <div className="movie-item__poster">
                         <img src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + this.props.poster} alt=""/>
                     </div>
                     <div className="movie-item__title">{this.props.title}</div>
                 </Link>
             </div>
             {this.state.popup ?
	             <MovieInfo
	             title={this.props.title}
	             originalTitle={this.props.original_title}
	             data={this.props.data}
                 el={this.el}
	             /> : null}
         </div>
     );
 }
}

export default MovieItem;
