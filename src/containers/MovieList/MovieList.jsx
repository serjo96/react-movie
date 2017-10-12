import React, { Component } from 'react';
import MovieItem from '../../components/Move/MovieItem';

class MovieList extends Component {
    render() {
            console.log(this.props.movieList);
        if (this.props.movieList.isFetching) {
            return (
                <div className="movies">
	                {this.props.movieList.data.dates ?
		                <div className="movies__data-range">
		                    Ожидаемые фильмы от {this.props.movieList.data.dates.minimum} - {this.props.movieList.data.dates.maximum}
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
                    <div className="main">
                        <div className="load-more">Смотреть все {this.props.movieListTitle}</div>
                    </div>

                </div>
            );
        } 
        return null;
			
    }
}



export default (MovieList);
