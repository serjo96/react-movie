import React from 'react';
import { Link } from 'react-router-dom';
import { friendlyUrl } from '../../utils/utils';

const MovieItem = (props) => (
    <div className="movie-item" id={props.id} >
        <div className="movie-item__data">
            <Link to={'/movie/' + friendlyUrl(props.original_title)}>
                <div className="movie-item__poster" style={{background: "url(https://image.tmdb.org/t/p/w370_and_h556_bestv2" + props.poster + ") no-repeat" , backgroundSize: '90%'}} />
            </Link>
            <div className="movie-item__title">{props.title}</div>
        </div>
    </div>
);

export default MovieItem;
