import React, { Component } from 'react';
import MovieItem from '../../components/Move/MovieItem';
import { friendlyData } from '../../utils/utils';

class MovieList extends Component {

	renderMovie = (item, index) => {
		if (index > 11) return;
		return (
			<MovieItem
				title={item.title}
				original_title={item.original_title}
				data={item}
				voteAverage={item.vote_average}
				poster={item.poster_path}
				key={index}
				id={item.id}
			/>
		);
	}

    render() {
        if (this.props.movieList.isFetching) {
            return (
                <div className="movies">
	                <div className="movies__header">
		                <h2 className="movies__title-list">{this.props.movieListTitle}</h2>
		                {this.props.movieList.data.dates ?
			                <div className="movies__data-range">
			                     {friendlyData(this.props.movieList.data.dates.minimum)} - {friendlyData(this.props.movieList.data.dates.maximum)}
		                    </div>
			                : null}
	                </div>
                    <div className="movies__list" >

	                    {this.props.movieList.data.results.map((item, index) => this.renderMovie(item, index)
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
