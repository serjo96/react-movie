import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { onLoadPerson, clearPersonData } from '../../../Data/actions/person-actions';
import {Helmet} from 'react-helmet';
import Lightbox from 'lightbox-react';
import { Timeline } from 'react-twitter-widgets'
import NoImg from '../../../assests/img/NoImg.png';
import ServiceBlock from '../../Service/ServiceBlock';
import MediaStills from '../../MediaPage/MediaStills';
import MediaItem from '../../MediaList/MediaItem';
import PersonMoviesList from '../components/PersonMoviesList';
import { urlRusLat, declOfNum, friendlyData } from '../../../utils/utils';

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBox: false,
            imgIndex: 0,
            imgCount: 11,
            intervalId: 0,
	        tvListCount: 15,
	        MovieListCount: 15
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.sendRequest(nextProps.match.params.id);
            this.scrollToTop();
        }
    }


    componentDidMount() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        this.sendRequest();
    }

    componentWillUnmount() {
        this.props.clearPersonData();
    }

 sendRequest = (id = this.props.match.params.id) =>{
     let movieId = id.split('-');
     this.props.loadPeopleData(movieId.pop());
 };

	loadMoreTV = (e) => {
		this.setState({tvListCount: this.state.tvListCount +=  12});
		e.target.closest('.filmography-list').classList.add('filmography-list--isMore');
	};

	loadMoreMovies = (e) => {
		this.setState({MovieListCount: this.state.MovieListCount +=  12});
		e.target.closest('.filmography-list').classList.add('filmography-list--isMore');
	};


 onClickImg = (e) =>{
     this.setState({
         imgIndex: e.target.dataset.index,
         lightBox: !this.state.lightBox
     });
 };

 scrollStep = () => {
     if (window.pageYOffset === 0) {
         clearInterval(this.state.intervalId);
     }
     window.scroll(0, window.pageYOffset - 50);
 };

 scrollToTop = () => {
     let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
     this.setState({ intervalId: intervalId });
 };

 renderMediaItem = (item, index ,typeList) => {
		return (<MediaItem
			title={item.title || item.name}
			original_title={item.original_title || item.original_name}
			overview={item.overview}
			voteAverage={item.vote_average}
			poster={item.poster_path}
			date={item.release_date || item.first_air_date}
			key={index}
			id={item.id}
			typeList={typeList}
		/>)
 };


 render() {
     let person = this.props.people.data;
     let {imgIndex} = this.state;

     	let lastMovies = this.props.people.sortedMovies.concat().filter(a => new Date(a.release_date) < new Date()).splice(0, 3),
     	    lastTV = this.props.people.sortedTV.concat().filter(a => new Date(a.first_air_date) < new Date() ).splice(0, 3),
	        bestMovies = person.movie_credits.cast.concat().filter(a => new Date(a.release_date) < new Date() ).sort((a, b) => b.vote_average - a.vote_average ).splice(0, 3),
	        bestTV = person.tv_credits.cast.concat().sort((a, b) => b.vote_average -a.vote_average ).splice(0, 3),
	        years =  new Date().getFullYear() - new Date(person.birthday).getFullYear();
         return (
             <div className="container">
	             <div className="person main">
		             <ServiceBlock isLoading={this.props.people.isFetching} isError={this.props.people.status} fetch={this.sendRequest}>
	                 <Helmet>
	                     <title>{person.name}</title>
	                 </Helmet>

		             <h1 className="person-name">{person.name}</h1>
		             <div className="person-info">
			             <div className="person-aside">
				             <div className="person-photo">
					             <img src={person.profile_path ? `https://image.tmdb.org/t/p/w185/${person.profile_path}` : NoImg} alt=""/>
				             </div>
				             { person.external_ids.twitter_id?<Timeline
						             dataSource={{
							             sourceType: 'profile',
							             screenName: person.external_ids.twitter_id
						             }}
						             options={{
							             username: 'TwitterDev',
							             theme: 'dark',
							             transparent: true,
							             tweetLimit: this.state.test,
							             slug: 'official-twitter-accts',
							             chrome: ['transparent', 'noborders']
						             }}
						             onLoad={() => console.log('Timeline is loaded!')}
					             />:null}
			             </div>
			             <div className="person-content">

				             <div className="mobile-person-info">
					             <div className="person-photo">
						             <img src={person.profile_path ? `https://image.tmdb.org/t/p/w185/${person.profile_path}` : NoImg} alt=""/>
					             </div>
				             </div>

				             <div className="person-info-table">

						             <div className="person-info-table__col">
							             <div className="person-dates col-content">
								             <div className="person-info-table__name-row">Дата рождения:</div>
								             <div className="person-info-table__data-row person-dates__numbers">
									             <div>{person.birthday ? friendlyData(person.birthday) : '-'}</div>
									             {person.deathday ? <div className="death-date-hyphen">-</div> : null}
									             {person.deathday ? <div>{friendlyData(person.deathday)}</div> : null}
									             </div>
							             </div>

							             {!person.deathday ? <div className="person-year col-content">
								             {person.birthday ? years + ' ' + declOfNum(years, ['год', 'года', 'лет']): null}
							             </div> : null}
						             </div>


						             <div className="person-info-table__col col-content">
							             <div className="person-info-table__name-row">Место рождения:</div>
							             <div className="person-info-table__data-row">{person.place_of_birth}</div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="all-movies col-content">
								             <div className="person-info-table__name-row">Всего фильмов:</div>
								             <div className="person-info-table__data-row">{person.movie_credits.cast.length}</div>
							             </div>
						             </div>


						             <div className="person-info-table__col col-content">
							             <div className="person-info-table__name-row">Всего сериалов:</div>
							             <div className="person-info-table__data-row">{person.tv_credits.cast.length}</div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="last-movies col-content">
								             <div className="person-info-table__name-row">Последние фильмы:</div>
								             <div className="person-info-table__data-row">{lastMovies.map((e, index)=> <div className="last-movies__item" key={index}><Link className='link' to={`/movie/${urlRusLat(e.title)}-${e.id}`}>{e.title}</Link></div>)}</div>
							             </div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="last-movies col-content">
								             <div className="person-info-table__name-row">Лучшие фильмы:</div>
								             <div className="person-info-table__data-row">{bestMovies.map((e, index)=> <div className="last-movies__item" key={index}><Link className='link' to={`/movie/${urlRusLat(e.title)}-${e.id}`}>{e.title}</Link></div>)}</div>
							             </div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="last-movies col-content">
								             <div className="person-info-table__name-row">Последние шоу:</div>
								             <div className="person-info-table__data-row">{lastTV.length > 0 ? lastTV.map((e, index)=> <div className="last-movies__item" key={index}><Link className='link' to={`/tv/${urlRusLat(e.name)}-${e.id}`}>{e.name}</Link></div>): '-'}</div>
							             </div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="last-movies col-content">
								             <div className="person-info-table__name-row">Лучшие шоу:</div>
								             <div className="person-info-table__data-row">{bestTV.length > 0 ? lastTV.map((e, index)=> <div className="last-movies__item" key={index}><Link className='link' to={`/tv/${urlRusLat(e.name)}-${e.id}`}>{e.name}</Link></div>): '-'}</div>
							             </div>
						             </div>

						             <div className="person-info-table__col">
							             <div className="last-links col-content">
								             <div className="person-info-table__name-row">Ссылки:</div>
								             <div className="person-info-table__data-row person-links">
									             {person.external_ids.facebook_id ? <a href={`https://www.facebook.com/${person.external_ids.facebook_id}`} target='_blank' className='social-link'>Facebook</a>: null}
									             {person.external_ids.imdb_id ? <a href={`http://www.imdb.com/name/${person.external_ids.imdb_id}`} target='_blank' className='social-link'>imdb</a>: null}
									             <a href={`https://www.themoviedb.org/person/${person.id}`} target='_blank' className='social-link'>TMDB</a>
									             {person.external_ids.instagram_id ? <a href={`https://www.instagram.com/${person.external_ids.instagram_id}`} target='_blank' className='social-link'>Instagram</a>: null}
									             {person.external_ids.twitter_id ? <a href={`https://www.twitter.com/${person.external_ids.twitter_id}`} target='_blank' className='social-link'>Twitter</a>: null}
									             {person.homepage ? <a href={person.homepage} target='_blank' className='social-link'>Домашняя старница</a>: null}
								             </div>
							             </div>
						             </div>

				             </div>
				             <div className="description">
					             <p className="description__text">{person.biography ? person.biography : 'Биография пока не добавленна'}</p>
				             </div>


				             { person.images.profiles.length>0 ?<MediaStills images={ person.images.profiles} title="Фото" imgCount={15} onClickImg={this.onClickImg}/>: null}

				             {this.props.people.sortedMovies.length>0 ?<PersonMoviesList title="Фильмография" typeList="movie" listData={ this.props.people.sortedMovies} />:null}
				             {this.props.people.sortedTV.length>0 ?<PersonMoviesList title="Сериалы" typeList="tv" listData={this.props.people.sortedTV} />: null}


				             {person.combined_credits.crew.length>0 ? <PersonMoviesList title="Учиствие в проектах" listData={person.combined_credits.crew}/>: null}
			             </div>

		             </div>




	                 {this.state.lightBox ?
	                     <Lightbox
	                         mainSrc={'https://image.tmdb.org/t/p/w1280' +  person.images.profiles[imgIndex].file_path}
	                         nextSrc={'https://image.tmdb.org/t/p/w1280' +  person.images.profiles[(imgIndex + 1) %  person.images.profiles.length].file_path}
	                         prevSrc={'https://image.tmdb.org/t/p/w1280' +  person.images.profiles[(imgIndex +  person.images.profiles.length - 1) % person.images.profiles.length].file_path}

	                         onCloseRequest={() => this.setState({ lightBox: false })}
	                         onMovePrevRequest={() => this.setState({
	                             imgIndex: (imgIndex +  person.images.profiles.length - 1) %  person.images.profiles.length
	                         })}
	                         onMoveNextRequest={() => this.setState({
	                             imgIndex: (imgIndex + 1) %  person.images.profiles.length
	                         })}
	                     />: null}
		             </ServiceBlock>
	             </div>
             </div>
         );

 }
}

function mapStateToProps(state) {
    return {
        people: state.Peoples.peopleData
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadPeopleData: (id) => dispatch(onLoadPerson(id)),
    clearPersonData: () => dispatch(clearPersonData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Person);
