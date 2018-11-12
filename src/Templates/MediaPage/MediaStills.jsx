import React, {Component} from 'react';
import Spinner from '../Spinner/Spinner';

export default class MediaStills extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            imgCount: this.props.imgCount ? this.props.imgCount-1 : 15,
            imgStatus: true
        };
    }

    loadMoreImg = (e) =>{
	    this.setState({imgCount: this.state.imgCount += this.props.imgCount ? this.props.imgCount : 16});
	    e.target.closest('.stills__list').classList.add('stills__list--moreLoaded');
    };

    onLoadImg = (e) =>{
	    e.target.classList.remove('img-loading');
        this.setState({imgStatus: false});
    };


    render() {
        return (

            <div className="stills">
                <h2>{this.props.title}</h2>
                <div className={`stills__list ${this.props.images.length <= this.state.imgCount+1 ? 'stills__list--moreLoaded' : ''} ${this.props.title === 'Фото' ? 'stills__list--person' : ''}`}>
                    {this.props.images.length > this.state.imgCount+1 ?
                        <div className="show-more show-more--stills">
                            <div className='show-more__btn' onClick={this.loadMoreImg}>Больше</div>
                        </div> : null
                    }
                    {this.props.images.map((backdrop, indx)=>
                        indx <= this.state.imgCount &&
			      <div className="stills__img" key={indx}>
                      {this.state.imgStatus ? <Spinner/> :null}
			          <img src={'https://image.tmdb.org/t/p/w1280' + backdrop.file_path} data-index={indx}
			               alt=""
			               className="img-loading"
			               onClick={this.props.onClickImg}
			               onLoad={this.onLoadImg}
			          />
			      </div>
                    )}
                </div>
            </div>
        );

    }

}
