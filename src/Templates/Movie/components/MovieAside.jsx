import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoImg from 'images/NoImg.png';
import Spinner from '../../../ui-components/spinner/Spinner';
import { friendlyUrl, urlRusLat } from 'utils/index';

class MovieAside extends Component {
  state = {
    imgStatus: true
  };

 onLoadImg = (e) => {
   e.target.classList.remove('img-loading');
   setTimeout(() => this.setState({ imgStatus: false }), 500);
 };

 render () {
   return (
     <aside className='aside'>
       <div className={`movie__poster${this.state.imgStatus ? ' poster-loading' : ''}`}>
         {this.state.imgStatus ? <Spinner /> : null}
         <img
           onLoad={this.onLoadImg} className='img-loading'
           src={(this.props.poster || this.props.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (this.props.poster || this.props.backdrop) : NoImg}
           alt='poster'
         />
       </div>
       <div className='crew-list infoTable-row'>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Режиссер</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Director.map((men, indx) => indx < 3
               ? <div className='crew__name' key={indx}><Link
                 to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                 className='link'
                                                        >{men.name}
               </Link>
                 </div> : null)}
           </div>
         </div>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Сценарий</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Screenplay.map((men, indx) => indx < 3
               ? <div className='crew__name' key={indx}><Link
                 to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                 className='link'
                                                        >{men.name}
               </Link>
                 </div> : null)}
           </div>
         </div>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Продюсер</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Producer.map((men, indx) => indx < 3
               ? <div className='crew__name' key={indx}><Link
                 to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                 className='link'
                                                        >{men.name}
               </Link>
                 </div> : null)}
           </div>
         </div>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Оператор</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Director_of_Photography.map((men, indx) => indx < 3
               ? <div className='crew__name' key={indx}><Link
                 to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                 className='link'
                                                        >{men.name}
               </Link>
                 </div> : null)}
           </div>
         </div>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Композитор</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Music.map((men, indx) => indx <= 3
               ? <div className='crew__name' key={indx}><Link
                 to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                 className='link'
                                                        >{men.name}
               </Link>
                 </div> : null)}
           </div>
         </div>
         <div className='crew__item infoTable-border aside-row'>
           <div className='crew__job'>Художник</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.crew.Art.map((men, indx) => indx < 3 ? <div className='crew__name' key={indx}><Link
               to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
               className='link'
                                                                                                       >{men.name}
             </Link>
             </div> : null)}
           </div>
         </div>
       </div>

       <div className='production'>
         <div className='aside-row'>
           <div className='production__title'>Страна</div>
           <div className='production__countries aside-row__right-col'>
             {this.props.production_countries.map((el, index) =>
               (<div className='country' key={index}>
                 <div>{el.name}</div>
                </div>)
             )}
           </div>
         </div>
       </div>
       <div className='production infoTable-row infoTable-border'>
         <div className='production-company-title'>Производители</div>
         <div className='production__companies'>
           {this.props.production_companies.map((el, index) =>
             (<div className='company' key={index}>
               <Link className='link' to={`/company/${friendlyUrl(el.name)}-${el.id}`}>{el.name}</Link>
              </div>)
           )}
         </div>
       </div>
       <div className='genres infoTable-row'>
         <div className='genres__title'>Жанр</div>
         <div className='genres__list'>
           {this.props.genres.map((el, indx) =>
             (<div className='genre' key={indx}>
               <Link
                 to={`/movies/all?genre-${urlRusLat(el.name)}-${el.id}`} className='tag'
                 id={el.id}
               >{el.name}
               </Link>
             </div>)
           )}
         </div>
       </div>
       <div className='keywords infoTable-row'>
         <div className='keywords__title'>Теги</div>
         <div className='keywords__list'>
           {this.props.keywords.map((el, indx) => (<Link
             to={`/lists/keywords_movie/${friendlyUrl(el.name)}-${el.id}`} className='keyword tag'
             id={el.id} key={indx}
           >{el.name}
           </Link>))}
         </div>
       </div>

       <div className='movie-links infoTable-row'>
         <div className='movie-links__title'>Ссылки</div>
         <div className='movie-links__list'>
           {this.props.imdb_id &&
             <a
               href={`http://www.imdb.com/title/${this.props.imdb_id}`}
               target='_blank'
               className='social-link'
             >
               imdb
             </a>}
           <a
             href={`https://www.themoviedb.org/movie/${this.props.id}`}
             target='_blank'
             className='social-link'
           >TMDB
           </a>
           {this.props.homepage &&
             <a
               href={this.props.homepage}
               target='_blank'
               className='social-link'
             >
               Страница фильма
             </a>}
         </div>
       </div>
     </aside>
   );
 }
}

export default (MovieAside);
