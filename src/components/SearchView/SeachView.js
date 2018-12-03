import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import GameCard from '../GameCard/GameCard';
import GameAddedSnackBar, { openSnackbar } from '../GameAddedSnackBar/GameAddedSnackBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';

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

class SearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            gameList: [],
        };
    }

    handleSearch = () => event => {
        this.setState({
            ...this.state.search,
            search: event.target.value,
        });
    }

    searchCollection = event => {
        event.preventDefault();
        const action = { type: 'LOCAL_SEARCH', payload: this.state.search }
        this.props.dispatch(action);
        this.setState({
            search: '',
        });
    }

    deleteGame = game => {
        swal({
            title: "For sure for sure?",
            text: "Are you sure you want to remove this game from your collection?",
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
        if (game.favorite === true) {
            const body = {
                id: game.id,
                person_id: game.person_id,
                favorite: false,
            }
            axios.put('/api/game', body)
                .then((response) => {
                    console.log(response);
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
                })
                .catch((error) => {
                    console.log('error on favorite put', error);
                });
        }
    };

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
                <ButtonAppBar addNew={this.addNew} localSearch={this.localSearch} collectionNav={this.collectionNav} favNav={this.favNav} genreNav={this.genreNav} logOut={this.logOut} currentView="Search;Collection" />
                <div className={classes.root}>
                    <Grid container spacing={24} justify={'center'}>
                        <Paper alignItems={'center'} className={classes.paper}>
                            <form onSubmit={this.searchCollection}>
                                <Grid item xs>
                                    <FormControl>
                                        <InputLabel htmlFor="apiSearch">
                                            Search:</InputLabel>
                                        <Input className="input" onChange={this.handleSearch()} value={this.state.search} placeholder='game title' />
                                    </FormControl>
                                </Grid>
                                <Grid item xs style={{ marginTop: 35 }}>
                                    <Button variant="contained" size="large" color="primary" type="submit">
                                        SEARCH COLLECTION
        </Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </div>
                <div>
                    <ul>
                        {this.props.searchResults.map(game =>
                            <GameCard key={game.id} title={game.title} image_url={game.image_url} genre={game.genre} favorite={game.favorite} game={game} delete={this.deleteGame} makeFavorite={this.makeFavorite} />)}
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

SearchView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SearchView));