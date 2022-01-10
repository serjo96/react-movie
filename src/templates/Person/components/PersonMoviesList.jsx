import React, { Component } from 'react';

import { MovieItem } from '../../MoviesList/components';

export default class PersonMoviesList extends Component {
  state = {
    MovieListCount: 15
  };

 loadMoreMovies = (e) => {
   this.setState({ MovieListCount: this.state.MovieListCount += 14 });
   e.target.closest('.filmography-list').classList.add('filmography-list--isMore');
 };

 renderMediaItem = (item, index) => {
   return (<MovieItem
     title={item.title || item.name}
     original_title={item.original_title || item.original_name}
     overview={item.overview}
     voteAverage={item.vote_average}
     poster={item.poster_path}
     date={item.release_date || item.first_air_date}
     key={index}
     id={item.id}
     typeList={this.props.typeList || item.media_type}
     genres={item.genre_ids}
     job={item.job}
           />);
 };

 render () {
 	const { listData } = this.props;
   return (
     <div className='filmography'>
       <h2>{this.props.title}</h2>
       <div className={`filmography-list ${listData.length >= 16 ? listData.length <= this.state.MovieListCount + 1 ? 'filmography-list--isMore' : '' : 'filmography-list--noMore'} tooltip-parent`}>
         {listData.length > this.state.MovieListCount + 1
           ? <div className='show-more show-more--stills'>
             <div className='show-more__btn' onClick={this.loadMoreMovies}>Больше</div>
             </div> : null}
         {listData.map((item, index) => index <= this.state.MovieListCount ? this.renderMediaItem(item, index) : null)}
       </div>
     </div>

   );
 }
}
