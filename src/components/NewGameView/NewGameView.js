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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './NewGameView.css'
import Tokyo from '../../images/tokyo.jpg';

const styles = theme => ({
    root: {
        flexGrow: 1,
        justify: 'center',
        alignItems: 'center',
    },
    paper: {
        justify: 'center',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
        textAlign: 'center',
        marginTop: '185px',
        color: theme.palette.text.secondary,
    },
});


const mapStateToProps = state => ({
    user: state.user,
    searchResults: state.searchResults.searchResults,
});

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

    getApi = event => {
        event.preventDefault();
        const action = { type: 'API_SEARCH', payload: this.state.newGame.search }
        this.props.dispatch(action);
        console.log(this.props.searchResults.searchResults);
        this.setState({
            newGame: {
                search: '',
            }
        });
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
        openSnackbar();
    }

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
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        const { classes } = this.props;
        let content = null;
        content = (

            <div>
                <GameAddedSnackBar />
                <ButtonAppBar addNew={this.addNew} localSearch={this.localSearch} collectionNav={this.collectionNav} favNav={this.favNav} genreNav={this.genreNav} logOut={this.logOut}  currentView="Add;Games" />
                <div className={classes.root}>
                    <Grid container spacing={24} justify={'center'}>
                        <Paper alignItems={'center'} className={classes.paper}>
                            <form onSubmit={this.getApi}>
                                <Grid item xs>
                                    <FormControl>
                                        <InputLabel htmlFor="apiSearch">
                                            Search:</InputLabel>
                                        <Input className="input" onChange={this.handleChange('search')} value={this.state.newGame.search} placeholder='game title' />
                                    </FormControl>
                                </Grid>
                                <Grid item xs style={{ marginTop: 35 }}>
                                    <Button variant="contained" size="large" color="primary" type="submit">
                                        FIND GAMES
        </Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
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

NewGameView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(NewGameView));