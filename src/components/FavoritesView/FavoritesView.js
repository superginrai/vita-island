import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';

const mapStateToProps = state => ({
    user: state.user,
});

class FavoritesView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: [],
        };
    }

    getFavorites = () => {
        // event.preventDefault();
        axios.get(`/api/game/favorites/${true}`)
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

    // handleChange = propertyName => event => {
    //     event.preventDefault();
    //     this.setState({
    //         genre: event.target.value,
    //     });
    //     console.log(this.state);
    // }

    componentDidMount() {
        this.props.dispatch(fetchUser());
        this.getFavorites();
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
            <div className="Favorites">
                <ul>{this.state.gameList.map(game =>
                    <li key={game.id}>{game.title}</li>)}</ul>
            </div>
        );
        //  }

        return (
            <div>
                <ButtonAppBar />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(FavoritesView);