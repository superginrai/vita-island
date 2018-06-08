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
});

class NewGameView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newGame: {
                title: '',
                genre_id: '',
            }
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

    addNewGame = event => {
        console.log(this.state.newGame);
        event.preventDefault();
        axios.post('/api/game', this.state.newGame).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
        // clear fields after submission
        this.setState({
            newGame: {
                title: '',
                genre_id: '',
            }
        });
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
        let content = null;
        // const { classes } = props;
        // if (this.props.user.username) {
        content = (
            <div className="add-item-container">
                <ButtonAppBar />
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
        );
        // }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(NewGameView);