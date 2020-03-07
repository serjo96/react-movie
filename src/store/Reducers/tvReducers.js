import {
	TV_DATA, CLEAR_TV_DATA, AIRING_TV, ALL_TV, ON_THE_AIR_TV, TOP_TV, TV_SEASON,
	CLEAR_TV_SEASON, TV_ENG_DATA, CHANGE_TV_PAGE
} from '../constants';
import update from 'react-addons-update';


const initialState = {
    TvData: {
        isFetching: false,
	    data: {
		    original_name: '',
		    name: '',
		    created_by: {},
		    backdrop_path: '',
		    poster_path: '',
		    episode_run_time: [],
		    first_air_date: '',
		    last_air_date: '',
		    in_production: true,
		    number_of_episodes: 0,
		    number_of_seasons: 0,
		    genres: [],
		    id: '',
		    imdb_id: '',
		    overview: '',
		    popularity: 0,
		    production_companies: [],
		    origin_country: [],
		    vote_average: 0,
		    vote_count: 0,
		    keywords: {
			    keywords: []
		    },
		    credits: {
			    cast: []
		    },
		    videos: {
			    results: []
		    },
		    recommendations: {
			    page: 1,
			    results: [],
			    total_pages: 0,
			    total_results: 0
		    },
		    content_rating: {},
		    external_ids: {},
		    screened_theatrically: {},
		    similar: {},
		    seasons: {}
	    },
	    images: [],
	    bgImages: {
		    backdrop: '',
		    poster: '',
		    season_poster: ''
	    },
	    tvTitles: {
		    title: '',
		    original_title: '',
		    seasonTitle: ''
	    },
	    tvCredits: {
		    cast: '',
		    crew: ''
	    },
	    tvVideos: {
		    results: ''
	    },
	    sortSeasons: '',
	    status: true
    },
    TvSeason: {
        isFetching: false
    },
    airingTv: {
        isFetching: false,
	    data: {
		    page: 1,
		    total_results: 0,
		    total_pages: 0,
		    results: []
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    },
    TopTv: {
        isFetching: false,
	    data: {
		    page: 1,
		    total_results: 0,
		    total_pages: 0,
		    results: []
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    },
    allTV: {
	    isFetching: false,
	    data: {
		    page: 1,
		    total_results: 0,
		    total_pages: 0,
		    results: [],
		    sortByDate: {}
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    },
    OnTheAirTv: {
        isFetching: false,
	    data: {
		    page: 1,
		    total_results: 0,
		    total_pages: 0,
		    results: []
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    }
};

export default function TVs(state = initialState, action) {

    switch (action.type) {

	    case TV_DATA:
	        let seasons = action.TVdata.data.seasons.slice().sort((a, b) => {
		        if ( a.season_number === 0) return 1;
		        if ( b.season_number === 0) return -1;
		        if (new Date(a.season_number) === new Date(b.season_number)) return 0;
		        return new Date(a.season_number) < new Date(b.season_number) ? -1 : 1;
	        });
            return update(state, {
                TvData: {$merge: {
	                    isFetching: true,
	                    data: action.TVdata.data,
		                images: action.TVdata.data.images.backdrops.concat(action.TVdata.data.images.posters),
		                bgImages: {
			                backdrop: action.TVdata.data.backdrop_path,
			                poster: action.TVdata.data.poster_path,
			                season_poster: null
		                },
		                tvTitles: {
	                        title: action.TVdata.data.name,
			                original_title: action.TVdata.data.original_name,
			                seasonTitle: null
		                },
		                tvCredits: {
			                cast: action.TVdata.data.credits.cast,
			                crew: action.TVdata.data.credits.crew
		                },
		                tvVideos: {
	                        results: action.TVdata.data.videos.results
		                },
		                sortSeasons: seasons,
		                status: action.TVdata.status
                }}
            });

	    case TV_ENG_DATA:
		    return update(state, {
			    TvData: {$merge: {
					    data: {...state.TvData.data, overview: action.data.overview},
					    tvTitles: {
					    	...state.TvData.tvTitles,
						    title: state.TvData.tvTitles.title !== action.data.name
							    ? action.data.name
							    : state.TvData.tvTitles.title}
				    }
			    }
		    });

	    case CLEAR_TV_DATA:
            return update(state, {
                TvData: {$merge: {
		                ...initialState.TvData
                }}
            });


	    case TV_SEASON:
            return update(state, {
	            TvSeason: {$merge: {
                    isFetching: true,
		            data: action.TV
	            }},
	            TvData: {$merge: {
		            bgImages: {
			            backdrop: action.TV.images.posters.length > 0
				            ? action.TV.images.posters[0].width > 950
					            ? action.TV.images.posters[0].file_path
					            : state.TvData.bgImages.backdrop
				            : state.TvData.bgImages.backdrop,
			            poster: state.TvData.bgImages.poster,
			            season_poster: action.TV.images.posters.length > 0 ? action.TV.images.posters[0].file_path : action.TV.poster_path
		            },
		            tvTitles: {
		            	title: state.TvData.tvTitles.title,
			            original_title: state.TvData.tvTitles.original_title,
			            seasonTitle: action.TV.name
		            },
		            tvCredits: {
		            	cast: action.TV.credits.cast.length > 0 ? action.TV.credits.cast : state.TvData.tvCredits.cast,
			            crew: action.TV.credits.crew.length > 0 ? action.TV.credits.crew : state.TvData.tvCredits.crew
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
				    bgImages: {
					    backdrop: state.TvData.bgImages.backdrop,
					    poster: state.TvData.bgImages.poster,
					    season_poster: null
				    },
				    tvCredits: {
					    cast: state.TvData.tvCredits.cast,
					    crew: state.TvData.tvCredits.crew
				    },
				    tvTitles: {
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
					    data: action.TV.data,
					    status: action.TV.status
			    }}
		    });

	    case ALL_TV:
		    return update(state, {
			    allTV: {$merge: {
					    isFetching: true,
					    data: action.TV.data,
					    status: action.TV.status
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
					    data: action.TV.data,
					    status: action.TV.status
			    }}
		    });

	    case CHANGE_TV_PAGE:
		    return update(state, {
			    [action.typeList]: {$merge: {
					    isFetching: false
				    }
			    }
		    });

        default:
            return state;
    }
}

