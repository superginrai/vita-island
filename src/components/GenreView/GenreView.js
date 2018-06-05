import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
});

class GenreView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: [],
            genre: 0,
        };
    }

    getGenre = (event) => {
        event.preventDefault();
        const id = this.state.genre
        axios.get(`/api/game/genre/${id}`)
            .then((response) => {
                console.log('ber?')
                console.log(response.data);
                this.setState({
                    gameList: response.data,
                });
            })
            .catch((error) => {
                console.log('error on games get: ', error);
            })
    }

    handleChange = propertyName => event => {
        event.preventDefault();
        this.setState({
            genre: event.target.value,
        });
        console.log(this.state);
    }

    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    //you better be logged in or ELSE
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;

        // if (this.props.user.username) {
        content = (
            <div className="Genre">
                <ul>{this.state.gameList.map(game =>
                    <li key={game.id}>{game.title}</li>)}</ul>
                <form onSubmit={this.getGenre}>
                    genre #?: <input className="input" onChange={this.handleChange()} value={this.state.genre} placeholder='genre' />
                    <input className="button" type="submit" value="DEPLOY IT" />
                </form>
            </div>
         );
        //  }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(GenreView);