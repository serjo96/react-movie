import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoImg from 'images/NoImg.png';
import Spinner from '../../Spinner/Spinner';
import { friendlyUrl, friendlyData, urlRusLat } from '../../../utils/utils';

class TVAside extends Component {
    state = {
      imgStatus: true
    };

 onLoadImg = (e) => {
   e.target.classList.remove('img-loading');
   setTimeout(() => this.setState({ imgStatus: false }), 500);
 };

 render () {
   return (

     <aside className='aside '>
       <div className={`movie__poster${this.state.imgStatus ? ' poster-loading' : ''}`}>
         {this.state.imgStatus ? <Spinner /> : null}
         <img
           onLoad={this.onLoadImg}
           className='img-loading'
           src={(this.props.bg.season_poster || this.props.bg.poster || this.props.bg.backdrop) ? 'https://image.tmdb.org/t/p/w185/' + (this.props.bg.season_poster || this.props.bg.poster || this.props.bg.backdrop) : NoImg}
           alt='poster'
         />
       </div>

       <div className='crew-list infoTable-row'>
         <div className='crew__item aside-row'>
           <div className='crew__job'>Создатели</div>
           <div className='crew__names aside-row__right-col'>
             {this.props.created_by.map((men, indx) => indx < 3
               ? <div className='crew__name' key={indx}>
                 <Link
                   to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                   className=' link'
                 >{men.name}
                 </Link>
             </div> : null)}
           </div>
         </div>
       </div>

       <div className='tv-release-date infoTable-row infoTable-border'>
         <div className='aside__element-title'>Давта выпуска</div>
         <div className='tv-release-date__date'>
           <div>{this.props.first_air_date ? friendlyData(this.props.first_air_date) : '-'}</div>
           <div>-</div>

           <div>{!this.props.in_production ? this.props.last_air_date !== null ? friendlyData(this.props.last_air_date) : '...' : '-'}</div>

         </div>

       </div>

       <div className='production infoTable-row infoTable-border'>
         <div className='aside-row'>
           <div className='production__title'>Страна</div>
           <div className='production__countries aside-row__right-col'>
             {this.props.origin_country.map((el, index) =>
               (<div className='country' key={index}>
                 <div>{el}</div>
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
                 to={`/tv/all?genre-${urlRusLat(el.name)}-${el.id}`} className='tag'
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
             to={`/lists/keywords_tv/${friendlyUrl(el.name)}-${el.id}`} className='keyword tag'
             id={el.id} key={indx}
           >{el.name}
           </Link>))}
         </div>
       </div>

       <div className='movie-links infoTable-row'>
         <div className='movie-links__title'>Ссылки</div>
         <div className='movie-links__list'>
           {this.props.links.imdb_id ? <a
             href={'http://www.imdb.com/title/' + this.props.links.imdb_id} target='_blank'
             className='social-link'
           >imdb
           </a> : null}
           {this.props.links.tvdb_id
             ? <a
               href={'https://www.thetvdb.com/?tab=series&id=' + this.props.links.tvdb_id} target='_blank'
               className='social-link'
             >tvdb
             </a> : null}
           <a
             href={'https://www.themoviedb.org/tv/' + this.props.id} target='_blank'
             className='social-link'
           >TMDB
           </a>
           {this.props.homepage
             ? <a href={this.props.homepage} target='_blank' className='social-link'>Официальный сайт</a> : null}
         </div>
       </div>

     </aside>
   );
 }
}

export default (TVAside);
