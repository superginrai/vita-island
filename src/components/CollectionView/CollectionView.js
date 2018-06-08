import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import GameCard from '../GameCard/GameCard';

const mapStateToProps = state => ({
    user: state.user,
});

class CollectionView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: [],
        };
    }

    getUsersGames = () => {
        axios.get('/api/game')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    gameList: response.data,
                });
            })
            .catch((error) => {
                console.log('error on games get: ', error);
            })
    }

    deleteGame = game => {
        axios.delete('/api/game', { params: { id: game.id, person_id: game.person_id } })
            .then((response) => {
                console.log(response);
                this.getUsersGames();
            })
            .catch((error) => {
                console.log('error on delete', error);

            })
    };

    // makeFavorite = game => {
    //     if (game.favorite = true) {
    //         axios.put('/api/game', { params: { id: game.id, favorite: game.favorite } })
    //     }
    // }

    makeFavorite = (game) => {
        console.log(game.favorite, 'fav clicked');
        if (game.favorite === true) {
            console.log('taco click');
            const body = {
                id: game.id,
                person_id: game.person_id,
                favorite: false,
            }
            axios.put('/api/game', body)
                .then((response) => {
                    console.log(response);
                    this.getUsersGames();
                })
                .catch((error) => {
                    console.log('error on favorite put', error);
                });

        } else {
            const body = {
                id: game.id,
                person_id: game.person_id,
                favorite: true,
            }

            axios.put('/api/game', body)
                .then((response) => {
                    console.log(response);
                    this.getUsersGames();
                })
                .catch((error) => {
                    console.log('error on favorite put', error);
                });
        }
    };

    componentDidMount() {
        this.props.dispatch(fetchUser());
        this.getUsersGames();
    }

    //you better be logged in or ELSE
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;

        //   if (this.props.user.username) {
        content = (
            <div className="Collection">
                {this.state.gameList.map(game =>
                    <GameCard key={game.id} game={game} title={game.title} image_url={game.image_url} genre={game.genre} favorite={game.favorite} delete={this.deleteGame} makeFavorite={this.makeFavorite} />)}
            </div>
        );
        //   }

        return (
            <div>
                <ButtonAppBar currentView="Your;Collection"/>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CollectionView);