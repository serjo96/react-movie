import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Post extends Component {
	componentDidMount() {
		let movieId = this.props.location.pathname.match(/\d+/)[0];
		console.log(movieId)
	}

    render() {

        // const post = this.props.movie.find((item) => item.id === +this.props.match.params.id);
        // if (!post) {
        //     return (
        //         <div className="main">
        //             <Link to="/" className="btn__buck">Назад</Link>
        //             <div className="not-fund__text">Такой записи не существует</div>
        //         </div>
        //     );
        // }
        return (
            <div className="main">
                <div className="movies-content">
                    123
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        movie: state.upcomingMovies.data
    }
}

export default connect(mapStateToProps)(Post)
