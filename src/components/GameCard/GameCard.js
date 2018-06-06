import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';

const mapStateToProps = state => ({
    user: state.user,
});

class GameCard extends Component {
    constructor(props) {
        super(props)
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

    render() {

        return (
            <div>
                   {this.props.title}
            </div>
        );
    }
}

export default (GameCard);