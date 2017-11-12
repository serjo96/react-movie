import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { urlRusLat } from '../../utils/utils';
import NoImg from '../../img/NoImg.png';
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
                         <img src={this.props.poster ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.props.poster : NoImg} alt={this.props.title}/>
                     </div>
                     <div className="movie-item__title">{this.props.title}</div>
                 </Link>
             </div>
             {this.state.popup ?
	             <MovieInfo
	             title={this.props.title}
	             originalTitle={this.props.original_title}
	             date={this.props.date}
                 overview={this.props.overview}
                 voteAverage={this.props.voteAverage}
                 el={this.el}
	             /> : null}
         </div>
     );
 }
}

export default MovieItem;
