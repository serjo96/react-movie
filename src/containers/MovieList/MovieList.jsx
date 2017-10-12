import React, { Component } from 'react';
import MovieItem from '../../components/Move/MovieItem';
import { friendlyData } from '../../utils/utils';

class MovieList extends Component {
    render() {
            console.log(this.props.movieList);
        if (this.props.movieList.isFetching) {
            return (
                <div className="movies">
	                <h2 className="movies__title-list">{this.props.movieListTitle}</h2>
	                {this.props.movieList.data.dates ?
		                <div className="movies__data-range">
		                     {friendlyData(this.props.movieList.data.dates.minimum)} - {friendlyData(this.props.movieList.data.dates.maximum)}
	                    </div>
		                : null}
                    <div className="movies__list">
                        {this.props.movieList.data.results.map(( item, index ) =>
                            (<MovieItem
                                title={item.title}
                                original_title={item.original_title}
                                data={item.release_date}
                                voteAverage={item.vote_average}
                                poster={item.poster_path}
                                key={index}
                                id={item.id}
                            />)
                        )}
                    </div>

	                <div className="movies__btn-wrap">
		                <div className="movies__btn btn">Открыть полный список</div>
	                </div>

                </div>
            );
        } 
        return null;
			
    }
}



export default (MovieList);
