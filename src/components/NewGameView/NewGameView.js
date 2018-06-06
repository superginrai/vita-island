import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';

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
            <div className="add-item-container">

                <form onSubmit={this.addNewGame}>
                    add a title: <input className="input" onChange={this.handleChange('title')} value={this.state.newGame.title} placeholder='title' />
                    <br />
                    add genre number: <input className="input" onChange={this.handleChange('genre_id')} value={this.state.newGame.genre_id} placeholder='genre' />
                    <input className="button" type="submit" value="DEPLOY IT" />
                </form>
            </div>
        );
        // }

        return (
            <div>
                <ButtonAppBar />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(NewGameView);