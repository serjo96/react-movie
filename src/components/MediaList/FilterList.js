import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../img/NoImg.png';
import { friendlyUrl, urlRusLat } from '../../utils/utils';

const ListsPage = (genres) => (
	<div className='filter-list'>
		{genres.genres.isFetching ?
			<div className="genre-filter">
				<div className="filter-name">Все жанры</div>
				<div className="filter-item-catalog">
					{genres.genres.data.arr.map((el, indx)=> <div key={indx}>{el.name}</div>)}
				</div>
			</div>
		: null}
	</div>
);

export default (ListsPage);
