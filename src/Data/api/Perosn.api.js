import { loadPeople } from './../actions/person-actions';
import * as axios from 'axios/index';

export function onLoadPerson(id) {
	return ( dispatch ) => {
		axios.get('https://api.themoviedb.org/3/person/'+id,
			{
				params: {
					api_key: '5a1d310d575e516dd3c547048eb7abf1',
					language: 'ru-RU',
					include_image_language: 'ru,null',
					append_to_response: 'movie_credits,images,tv_credits,combined_credits,external_ids,images,tagged_images,latest'
				}
			}
		).then(res => {
			dispatch(loadPeople({data: res.data, status: res.status === 200}));
		});
	};
}


