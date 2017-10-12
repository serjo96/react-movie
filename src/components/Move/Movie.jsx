import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Post extends Component {
    render() {
    console.log(this.props)
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
                123
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        movie: state.moviesUpcoming.data
    }
}

export default connect(mapStateToProps)(Post)
