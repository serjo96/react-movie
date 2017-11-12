import React, {Component} from 'react';


export default class MovieStills extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            imgCount: 11
        };
    }
    render() {
        return (

            <div className="stills">
                <h2>Кадры из фильма</h2>
                <div className="stills__list">
                    {this.props.images.length > this.state.imgCount+1 ?
                        <div className="show-more show-more--stills">
                            <div className='show-more__btn' onClick={() => this.setState({imgCount: this.state.imgCount += 12})}>Больше</div>
                        </div> : null
                    }
                    {this.props.images.map((backdrop, indx)=>
                        indx <= this.state.imgCount &&
			      <div className="stills__img"
			           key={indx}
			      >
			          <img src={'https://image.tmdb.org/t/p/w1280' + backdrop.file_path} data-index={indx}
			               alt=""
			               className="img-loading"
			               onClick={this.props.onClickImg}
			               onLoad={e=> e.target.classList.remove('img-loading')}
			          />
			      </div>
                    )}
                </div>
            </div>
        );

    }

}
