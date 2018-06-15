import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import GameCard from '../GameCard/GameCard';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GenreDropDown from '../GenreDropDown/GenreDropDown';
import swal from 'sweetalert';

const mapStateToProps = state => ({
    user: state.user,
});

class GenreView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: [],
            genre: '',
        };
    }

    // handleGenre = genre => {
    //     this.props.dispatch({
    //         type: 'GET_GENRE',
    //         payload: genre,
    //     })
    // }

    handleGenre = (genre_id) => {
        // event.preventDefault();
        // const id = this.state.genre
        axios.get(`/api/game/genre/${genre_id}`)
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
                            this.handleGenre(game.genre_id);
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
                    this.handleGenre(game.genre_id);
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
                    this.handleGenre(game.genre_id);
                })
                .catch((error) => {
                    console.log('error on favorite put', error);
                });
        }
    };

    // handleGenre = (genre_id) => event => {
    //     this.setState({
    //         genre: genre_id,
    //     })
    //     this.getGenre();
    // }
    // handleChange = propertyName => event => {
    //     event.preventDefault();
    //     this.setState({
    //         genre: event.target.value,
    //     });
    //     console.log(this.state);
    //     this.getGenre(event);
    //     this.handleClose();
    // }

    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    // handleClose = () => {
    //     this.setState({ anchorEl: null });
    // };

    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    //you better be logged in or ELSE
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        // this.getGenre();
    }

    render() {
        let content = null;
        const { anchorEl } = this.state;
        // if (this.props.user.username) {
        content = (
            <div className="Genre">
            <br/>
                <ButtonAppBar addOn={<GenreDropDown genreId={this.state.genre} handleGenre={this.handleGenre} />} currentView="Genre:" />
                {/* <div>
                    <GenreDropDown genreId={this.state.genre} handleGenre={this.handleGenre} />
                </div> */}
                {/* <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    GENRE
        </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleChange()}  value='7'>RPG</MenuItem>
                    <MenuItem onClick= {this.handleChange()} value='4'>Otome</MenuItem>
                    <MenuItem onClick={this.handleChange()} value='12'>Visual Novel</MenuItem>
                </Menu> */}
                {this.state.gameList.map(game =>
                    <GameCard key={game.id} title={game.title} image_url={game.image_url} genre={game.genre} favorite={game.favorite} game={game} delete={this.deleteGame} makeFavorite={this.makeFavorite} />)}
                {/* <form onSubmit={this.getGenre}>
                    genre #?: <input className="input" onChange={this.handleChange()} value={this.state.genre} placeholder='genre' />
                    <input className="button" type="submit" value="DEPLOY IT" />
                </form> */}
            </div>
        );
        //  }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(GenreView);