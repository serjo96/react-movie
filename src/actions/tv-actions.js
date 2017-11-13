import  { TV_DATA, CLEAR_TV_DATA } from '../constants';
import * as axios from 'axios';

 function takeTvData( data ) {
	return {
		type: TV_DATA,
		data
	};
}

export function clearTvData() {
	return {
		type: CLEAR_TV_DATA
	};
}


export function onLoadTV(id) {
	return ( dispatch ) => {
		axios.get('https://api.themoviedb.org/3/tv/'+id,
			{
				params: {
					api_key: '5a1d310d575e516dd3c547048eb7abf1',
					language: 'ru-RU',
					include_image_language: 'ru,null',
					append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
				}
			}
		).then(response => {
			dispatch(takeTvData(response.data));
		});
	};
}
