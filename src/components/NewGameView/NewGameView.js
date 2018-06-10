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

const mapStateToProps = state => ({
    user: state.user,
    searchResults: state.searchResults,
});

// const mapReduxStateToProps = reduxState => ({
//     reduxState,
// });

// const config = {
//     headers: { 'user-key': '72bb7ce60b4626f158199825d65f9ffc', 'accept': 'application/json' }
//     //  headers: {'Access-Control-Allow-Origin': '*' } 
// };

class NewGameView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newGame: {
                title: '',
                genre_id: '',
                search: '',
            },
            // search: '',
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

    // handleSearch = event => {
    //     this.setState({
    //         ...this.state.search,
    //         search: event.target.value,
    //     });
    // }

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

        // this.setState({
        //   newItem: {
        //     description: '',
        //     image_url: '',
        //   }
        // });
    }

    // getApi = () => {
    //     //  event.preventDefault();
    //     axios({
    //         method: 'GET',
    //         url: 'https://api-2445582011268.apicast.io/games/13558?fields=*', config,
    //         // params: config,
    //     })
    //         .then(response => {
    //             console.log(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }

    // addNewGame = event => {
    //     console.log(this.state.newGame);
    //     event.preventDefault();
    //     axios.post('/api/game', this.state.newGame).then(response => {
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    //     // clear fields after submission
    //     this.setState({
    //         newGame: {
    //             title: '',
    //             genre_id: '',
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
                <ButtonAppBar />
                <br />
                <br />
                <div className="add-item-container">
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
                        {/* <input className="button" type="submit" value="DEPLOY IT" /> */}
                        <Button variant="contained" size="large" color="primary" type="submit">
                            ADD TO YOUR COLLECTION
        </Button>
                    </form>
                </div>
                {/* <form onSubmit={this.getApi(this.state.search)}>
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

                    <form onSubmit={this.getApi}>
                        search: <input className="input" onChange={this.handleChange('search')} value={this.state.search} placeholder='searchy search' />
                        <br />
                        <input className="button" type="submit" value="DEPLOY IT" />
                    </form>
                </div>
                <div>
                    <h3>Results</h3>
                </div>
                <ul>
                    {this.props.searchResults.searchResults.map(result =>
                        <li>{result.name}</li>)}
                </ul>
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