import { PERSON_DATA, CLEAR_PERSON_DATA, TWITTER_DATA } from '../constants';
import * as axios from 'axios';

function loadPeople(person) {
    return {
        type: PERSON_DATA,
        person
    };
}


export function clearPersonData() {
    return {
        type: CLEAR_PERSON_DATA
    };
}

export function loadTwitts(name) {
    return ( dispatch ) => {

    };
}


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
        ).then(data => {
            // if (data.data.external_ids.twitter_id) {
	         //    axios.post('https://api.twitter.com/oauth/access_token',
		     //        {
			 //            params: {
				//             Name: 'person-tweets',
				//             oauth_verifier: 'NZupkxkTPsMzA9BnhBqKeIdwMQVBhv0dnhxnr54DbtgE2'
			 //            }
		     //        }
	         //    ).then(resp => {
		     //        console.log(resp);
		     //        axios.get('https://api.twitter.com/1.1/statuses/user_timeline',
			 //            {
				//             params: {
				// 	            Name: 'person-tweets',
				// 	            screen_name: data.data.external_ids.twitter_id,
				// 	            count: 3
				//             }
			 //            }
		     //        ).then(data => {
			 //            console.log(data);
		     //        });
	         //    });
            // }
            dispatch(loadPeople(data.data));
        });
    };
}


