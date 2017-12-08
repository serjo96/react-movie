import React from 'react';
import PropTypes from 'prop-types';

const imgError = (image) => {

	let url = `http://i3.ytimg.com/vi/${image.key.split('/')[0] === 'https:' ? image.key.split('/')[image.key.split('/').length - 1] : image.key}/mqdefault.jpg`;
	let i = new Image();
	i.src=url;
	let arr = [];

	i.onload = function() {
		arr.push(i)
		return this.width !== 120 && this.height !== 90;
	}
	 arr.filter(e=> e.width !== 120 && e.height !== 90 );
	console.log(arr)
};


const renderVideo = (video, indx,tv) => {
	if ( imgError(`http://i3.ytimg.com/vi/${video.key.split('/')[0] === 'https:' ? video.key.split('/')[video.key.split('/').length - 1] : video.key}/mqdefault.jpg`) ){
		return (
			<div className="trailer__preview" id={video.key} key={indx}>
				<div className="preview-base" onClick={tv.onClick}><i className="fa fa-play" aria-hidden="true"/></div>
				<img src={`http://i3.ytimg.com/vi/${video.key.split('/')[0] === 'https:' ? video.key.split('/')[video.key.split('/').length - 1] : video.key}/mqdefault.jpg`} alt=""/>
			</div>)
	} else{
		return null
	}
}

const TVvideos = (tv) => (
	<div className="trailer">

		<h2>{tv.videos.results.length === 1 ? 'Трейлер' : 'Трейлеры'}</h2>
		<div className="trailer__list">
			{tv.videos.results.map((video, indx)=>
				<div className="trailer__preview" id={video.key} key={indx}>

					<div className="preview-base" onClick={tv.onClick}><i className="fa fa-play" aria-hidden="true"/></div>
					<img src={`http://i3.ytimg.com/vi/${video.key.split('/')[0] === 'https:' ? video.key.split('/')[video.key.split('/').length - 1] : video.key}/mqdefault.jpg`} alt=""/>
				</div>
			)}
		</div>
	</div>
);

export default TVvideos;
