import React, { Component } from 'react';
import MovieItem from './MediaItem';
import { Link } from 'react-router-dom';
import { friendlyData } from '../../utils/utils';

class MediaList extends Component {
  renderListTitle () {
    if (this.props.movieListMain) {
      return (
        <Link className='title-link link-angle' to={'/movies/' + this.props.ListLink}>
          <span>{this.props.movieListTitle}</span>
          <i className='fa fa-angle-right' aria-hidden='true' />
        </Link>
      );
    }
    return (
      <div>
        <span>{this.props.movieListTitle}</span>
      </div>
    );
  }

 renderMovie = (item, index) => {
   // show only 11 movies on main page
   if (this.props.count && index > this.props.count) {
     return null;
   }

   return (
     <MovieItem
       title={item.title || item.name}
       original_title={item.original_title || item.original_name}
       overview={item.overview}
       voteAverage={item.vote_average}
       poster={item.profile_path || item.poster_path}
       date={item.release_date || item.first_air_date}
       key={index}
       id={item.id}
       genres={item.genre_ids}
       typeList={item.media_type || this.props.typeList}
     />
   );
 };

 render () {
   if (this.props.movieList.isFetching) {
     return (
       <div className='movies'>
         <div className='movies__header'>
           <h2 className='movies__title-list'>
             {this.renderListTitle()}
           </h2>
           {this.props.movieList.data.dates
			                ? <div className='movies__data-range'>
               {friendlyData(this.props.movieList.data.dates.minimum)} - {friendlyData(this.props.movieList.data.dates.maximum)}
             </div>
			                : null}
         </div>

         <div className='movies__list tooltip-parent'>
           {this.props.movieList.data.results.map((item, index) => this.renderMovie(item, index))}
         </div>

       </div>
     );
   }
   return null;
 }
}

export default (MediaList);
