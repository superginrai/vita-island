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

    getGenre = (event) => {
        // event.preventDefault();
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

    handleGenre = (genre_id) => event => {
        this.setState({
            genre: genre_id,
        })
        this.getGenre();
    }
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
                <div>
                    <GenreDropDown handleGenre={this.handleGenre} />
                </div>
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
                    <GameCard key={game.id} title={game.title} image_url={game.image_url} favorite={game.favorite} />)}
                {/* <form onSubmit={this.getGenre}>
                    genre #?: <input className="input" onChange={this.handleChange()} value={this.state.genre} placeholder='genre' />
                    <input className="button" type="submit" value="DEPLOY IT" />
                </form> */}
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

export default connect(mapStateToProps)(GenreView);