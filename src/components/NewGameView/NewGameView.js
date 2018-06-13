import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import GenreDropDown from '../GenreDropDown/GenreDropDown';
import Button from '@material-ui/core/Button';
import ResultGame from '../ResultGame/ResultGame';
import igdb from 'igdb-api-node';
import GameAddedSnackBar, { openSnackbar } from '../GameAddedSnackBar/GameAddedSnackBar';



const mapStateToProps = state => ({
    user: state.user,
    searchResults: state.searchResults.searchResults,
});


// const client = igdb('72bb7ce60b4626f158199825d65f9ffc'),
//     log = response => {
//         console.log(response.url, JSON.stringify(response.body, null, 2));
//     };

// client.image({
//     cloudinary_id: result.cover.cloudinary_id,
// }, 'cover_big', 'jpg');

// const config = {
//  'user-key': '72bb7ce60b4626f158199825d65f9ffc', 'accept': 'application/json' 

// };

class NewGameView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newGame: {
                title: '',
                genre_id: '',
                image_url: '',
                search: '',
            },
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newGame: {
                ...this.state.newGame,
                [propertyName]: event.target.value,
            }
        });
    }

    handleGenre = (genre) => {
        this.setState({
            newGame: {
                ...this.state.newGame,
                genre_id: genre,
            }
        })
    }

    handleTitle = (newTitle) => {
        this.setState({
            newGame: {
                ...this.state.newGame,
                title: newTitle,
            }
        })
    }

    handleSearch = event => {
        this.setState({
            ...this.state.search,
            search: event.target.value,
        });
    }

    // getApi = (search) => {
    //     // event.preventDefault();
    //     // const search = event.target.value
    //     axios.get(`http://www.giantbomb.com/api/search/?api_key=b901898053fca3a33f549441a3c3452941eed42f&format=json&query="${search}"&resources=game`)
    //         .then(response => {
    //             console.log(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }

    getApi = event => {
        event.preventDefault();
        const action = { type: 'API_SEARCH', payload: this.state.newGame.search }
        this.props.dispatch(action);
        console.log(this.props.searchResults.searchResults);

    }

    addNewGame = game => event => {
        console.log('game:', game);
        event.preventDefault();
        const action = { type: 'ADD_GAME', payload: game }
        this.props.dispatch(action);
        this.showNotifier();
    }

    showNotifier = (event) => {
        // event.preventDefault();
        console.log('snackssss');
        openSnackbar();
      }
    // getApi = () => {
    //     // client.games({
    //     //     filters: {
    //     //         'release_dates.date-gt': '2010-12-31',
    //     //         'release_dates.date-lt': '2012-01-01'
    //     //     },
    //     //     limit: 5,
    //     //     offset: 0,
    //     //     search: 'trails of cold steel'
    //     // }, [
    //     //         'name',
    //     //         'release_dates.date',
    //     //         'rating',
    //     //         'hypes',
    //     //         'cover'
    //     //     ]).then(log);

    //     client.games({
    //         filters: {
    //             'platforms-eq': '46',
    //         },
    //         fields: '*', // Return all fields
    //         limit: 5, // Limit to 5 results
    //         // offset: 15, // Index offset for results
    //         search: ''
    //     }).then(response => {
    //         // response.body contains the parsed JSON response to this query
    //         console.log(response);
    //     }).catch(error => {
    //         throw error;
    //     });

    //  event.preventDefault();
    // axios({
    //     method: 'GET',
    //     url: 'https://api-2445582011268.apicast.io/games/13558?fields=*',
    //     params: config,
    // })
    //     .then(response => {
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    // addNewGame = (game) = event => {
    //     // console.log(event.target.value);
    //     event.preventDefault();
    //     axios.post('/api/game', game).then(response => {
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    //     // clear fields after submission
    //     this.setState({
    //         newGame: {
    //             title: '',
    //             genre_id: '',
    //             image_url: '',
    //         }
    //     });
    // }

    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;
        // const { classes } = props;
        // if (this.props.user.username) {
        content = (

            <div>
                <GameAddedSnackBar />
                <ButtonAppBar currentView="Add a Game:" />
                <br />
                <br />
                {/* <div className="add-item-container">
                    <form onSubmit={this.addNewGame}>
                        <div>
                            <FormControl >
                                <InputLabel htmlFor="username">
                                    Title:</InputLabel>
                                <Input
                                    id="title"
                                    value={this.state.newGame.title}
                                    onChange={this.handleChange('title')}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <div>
                                <GenreDropDown handleGenre={this.handleGenre} />
                            </div>
                        </div>
                        <input className="button" type="submit" value="DEPLOY IT" />
                        <Button variant="contained" size="large" color="primary" type="submit">
                            ADD TO YOUR COLLECTION
        </Button>
                    </form>
                </div> */}
                {/* <form onSubmit={this.getApi}>
                    <FormControl >
                        <InputLabel htmlFor="apiSearch">
                            Search:</InputLabel>
                        <Input
                            id="search"
                            value={this.state.search}
                            onChange={this.handleSearch}
                        />
                    </FormControl>
                <Button variant="contained" size="large" color="primary" type="submit">
                    API REQUEST YO
        </Button>
                </form> */}

                <div className="search api">
                    <br />
                    <form onSubmit={this.getApi}>
                        <FormControl>
                            <InputLabel htmlFor="apiSearch">
                                Search:</InputLabel>
                            <Input className="input" onChange={this.handleChange('search')} value={this.state.search} placeholder='game title' />
                        </FormControl>
                        <br />
                        {/* <input className="button" type="submit" value="DEPLOY IT" /> */}
                        <Button variant="contained" size="large" color="primary" type="submit">
                            FIND GAMES
        </Button>
                    </form>
                </div>
                <div>
                    <ul>
                        {this.props.searchResults.map(result =>
                            <ResultGame key={result.id} result={result} addNewGame={this.addNewGame} />)}
                    </ul>
                </div>
            </div>
        );
        return (
            
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(NewGameView);