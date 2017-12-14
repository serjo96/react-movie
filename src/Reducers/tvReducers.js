import {
	TV_DATA, CLEAR_TV_DATA, AIRING_TV, POPULAR_TV, ON_THE_AIR_TV, TOP_TV, CLEAR_TV_IMAGES, TV_SEASON,
	CLEAR_TV_SEASON, TV_ENG_DATA
} from '../constants';
import update from 'react-addons-update';


const initialState = {
    TvData: {
        isFetching: false
    },
	TvSeason: {
		isFetching: false
	},
    airingTv: {
        isFetching: false
    },
    TopTv: {
        isFetching: false
    },
    PopTv: {
        isFetching: false
    },
    OnTheAirTv: {
        isFetching: false
    }
};

export default function TVs(state = initialState, action) {

    switch (action.type) {

        case TV_DATA:
	        let seasons = action.data.seasons.slice().sort((a,b) => {
		        if( a.season_number === 0) return 1;
		        if( b.season_number === 0) return -1;
		        if(new Date(a.season_number) === new Date(b.season_number)) return 0;
		        return new Date(a.season_number) < new Date(b.season_number) ? -1 : 1;
	        });
            return update(state, {
                TvData: {$merge: {
                    isFetching: true,
                    data: action.data,
	                images: action.data.images.backdrops.concat(action.data.images.posters),
	                bgImages: {
		                backdrop: action.data.backdrop_path,
		                poster: action.data.poster_path,
		                season_poster: null
	                },
	                tvTitles: {
                        title: action.data.name,
		                original_title: action.data.original_name,
		                seasonTitle: null,
	                },
	                tvCredits: {
		                cast: action.data.credits.cast,
		                crew: action.data.credits.crew
	                },
	                tvVideos: {
                        results: action.data.videos.results
	                },
	                sortSeasons: seasons
                }}
            });

	    case TV_ENG_DATA:
		    return update(state, {
			    TvData: {$merge: {
					    data: {...state.TvData.data, overview: action.data.overview},
					    tvTitles: {...state.TvData.tvTitles,  title: state.TvData.tvTitles.title !== action.data.name ? action.data.name : state.TvData.tvTitles.title}
				    }
			    }
		    });

        case CLEAR_TV_DATA:
            return update(state, {
                TvData: {$merge: {
                    isFetching: false,
                    data: null
                }}
            });

        case CLEAR_TV_IMAGES:
            return update(state, {
                TvData: {$merge: {
                    isFetching: false,
	                images: null
                }}
            });

	    case TV_SEASON:
            return update(state, {
	            TvSeason: {$merge: {
                    isFetching: true,
		            data: action.TV
	            }},
	            TvData: {$merge: {
		            bgImages:{
			            backdrop: action.TV.images.posters.length > 0 ? action.TV.images.posters[0].width > 950 ? action.TV.images.posters[0].file_path : state.TvData.bgImages.backdrop : state.TvData.bgImages.backdrop,
			            poster: state.TvData.bgImages.poster,
			            season_poster: action.TV.images.posters.length > 0 ? action.TV.images.posters[0].file_path : action.TV.poster_path
		            },
		            tvTitles:{
		            	title: state.TvData.tvTitles.title,
			            original_title: state.TvData.tvTitles.original_title,
			            seasonTitle: action.TV.name
		            },
		            tvCredits: {
		            	cast: action.TV.credits.cast.length>0 ? action.TV.credits.cast : state.TvData.tvCredits.cast,
			            crew: action.TV.credits.crew.length>0 ? action.TV.credits.crew : state.TvData.tvCredits.crew,
		            },
		            tvVideos: {
			            results: action.TV.videos.results > 0 ? action.TV.videos.results : state.TvData.tvVideos.results
		            }
	            }}
            });


	    case CLEAR_TV_SEASON:
		    return update(state, {
			    TvSeason: {$merge: {
				    isFetching: false,
				    data: null
			    }},
			    TvData: {$merge: {
				    bgImages:{
					    backdrop: state.TvData.bgImages.backdrop,
					    poster: state.TvData.bgImages.poster,
					    season_poster: null
				    },
				    tvCredits: {
					    cast: state.TvData.tvCredits.cast,
					    crew: state.TvData.tvCredits.crew,
				    },
				    tvTitles:{
					    title: state.TvData.tvTitles.title,
					    original_title: state.TvData.tvTitles.original_title,
					    seasonTitle: null
				    },
				    tvVideos: {
				    	results: state.TvData.tvVideos.results
				    }
			    }}
		    });

	    case AIRING_TV:
		    return update(state, {
			    airingTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }}
		    });

	    case POPULAR_TV:
		    return update(state, {
			    PopTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }}
		    });

	    case TOP_TV:
		    let results = action.TV.results.sort((a, b)=> b.vote_average - a.vote_average);
		    return update(state, {
			    TopTv: {$merge: {
				    isFetching: true,
				    data: {...action.TV,  results: results}
			    }}
		    });

	    case ON_THE_AIR_TV:
		    return update(state, {
			    OnTheAirTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }}
		    });


        default:
            return state;
    }
}

