import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import GameCard from '../GameCard/GameCard';
import swal from 'sweetalert';

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

    deleteGame = game => {
        swal({
            title: "For sure for sure?",
            text: "Are you sure you want to remove this game from  your collection?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("The game has been removed.", {
                        icon: "success",
                    });
                    axios.delete('/api/game', { params: { id: game.id, person_id: game.person_id } })
                        .then((response) => {
                            console.log(response);
                            this.getFavorites();
                        })
                        .catch((error) => {
                            console.log('error on delete', error);
                        })
                } else {
                    swal("It will remain in your collection!");
                }
            });
    };

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
                    this.getFavorites();
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
                    this.getFavorites();
                })
                .catch((error) => {
                    console.log('error on favorite put', error);
                });
        }
    };

    addNew = () => {
        this.props.history.push('/newGame');
    }

    localSearch = () => {
        this.props.history.push('/search');
    }

    collectionNav = () => {
        this.props.history.push('/collection');
    }

    favNav = () => {
        this.props.history.push('/favorites');
    }

    genreNav = () => {
        this.props.history.push('genre');
    }

    logOut = () => {
        this.props.history.push('/home');
    }

    componentDidMount() {
        this.props.dispatch(fetchUser());
        this.getFavorites();
    }

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
                <br />
                {this.state.gameList.map(game =>
                    <GameCard key={game.id} title={game.title} image_url={game.image_url} favorite={game.favorite} game={game} delete={this.deleteGame} makeFavorite={this.makeFavorite} />)}
            </div>
        );
        //}

        return (
            <div>
                <ButtonAppBar addNew={this.addNew} localSearch={this.localSearch} collectionNav={this.collectionNav} favNav={this.favNav} genreNav={this.genreNav} logOut={this.logOut} currentView="Favorites" />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(FavoritesView);