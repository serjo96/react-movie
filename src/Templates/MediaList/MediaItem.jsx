import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { urlRusLat } from './../../utils/utils';
import NoImg from 'images/NoImg.png';
import MovieInfo from './../Tooltip/MovieInfo';
import Spinner from './../Spinner/Spinner';

class MediaItem extends Component {
    state = {
      popup: false,
      imgStatus: true
    };

    el = null;

 outItem = () => {
    	if (this.props.typeList !== 'person') {
    		this.setState({
			    popup: true
		    });
    	}
 };

 leaveItem = () => {
   this.setState({
     popup: false
   });
 };

 onLoadImg = (e) => {
   e.target.classList.remove('img-loading');
   this.setState({ imgStatus: false });
 };

 render () {
   return (
     <div
       className={`movie-item${this.state.imgStatus ? ' movie-loading' : ''}
        ${this.state.popup
         ? 'movie-item--hover'
         : ''}`}
       id={this.props.id}
       onMouseEnter={this.outItem}
       onMouseLeave={this.leaveItem}
       ref={el => {
         this.el = el;
       }}
     >
       <div className='movie-item__data'>
         <Link to={'/' + this.props.typeList + '/' + urlRusLat(this.props.title) + '-' + this.props.id}>
           <div className='movie-item__poster'>
             <img
               className='img-loading'
               onLoad={this.onLoadImg}
               src={this.props.poster
                 ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.props.poster
                 : NoImg}
               alt={this.props.title}
             />
             {this.state.imgStatus ? <Spinner /> : null}
           </div>
           <div className='movie-item__title'>{this.props.title}</div>
           {this.props.job ? <div className='movie-item__crew'>{this.props.job}</div> : null}
         </Link>
       </div>
       {this.state.popup
         ? <MovieInfo
           title={this.props.title}
           originalTitle={this.props.original_title}
           date={this.props.date}
           overview={this.props.overview}
           voteAverage={this.props.voteAverage}
           el={this.el}
           typeItem={this.props.typeList}
           genres={this.props.genres}
           id={this.props.id}
           /> : null}
     </div>
   );
 }
}

MediaItem.propTypes = {
  title: PropTypes.string,
  original_title: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  poster: PropTypes.string,
  voteAverage: PropTypes.number,
  overview: PropTypes.string,
  typeList: PropTypes.string.isRequired
};

export default MediaItem;
