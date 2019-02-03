import React from 'react';
import PropTypes from 'prop-types';

export const loadEngData  = (overview) => {
	if (overview) {
		return (
			 <p className="description__text">{overview}</p>
		);
	}
	return (
		<div>
			<div>Ой! Кажется описание к этому произведению отсутствует</div>
			<div className="load-description-eng">
				<span onClick={()=>this.props.loadTvData(tv.id, 'en-US')}>Загрузить описание на английском?</span>
			</div>
		</div>
	);

};

PageSwitcher.propTypes = {
	page: React.PropTypes.number,
	total_pages: React.PropTypes.number,
	prevPage: React.PropTypes.func,
	nextPage: React.PropTypes.func
};
