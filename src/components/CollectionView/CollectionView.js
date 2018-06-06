import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import DropDown from '../DropDown/DropDown';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import GameCard from '../GameCard/GameCard';

const mapStateToProps = state => ({
    user: state.user,
});

class CollectionView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameList: [],
        };
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



    componentDidMount() {
        this.props.dispatch(fetchUser());
        this.getUsersGames();
    }

    //you better be logged in or ELSE
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;

        //   if (this.props.user.username) {
            content = (
                <div className="Collection">
                    {this.state.gameList.map(game =>
                        <GameCard key = {game.id} title={game.title} image_url={game.image_url} favorite={game.favorite}/>)}
                </div>
            );
        //   }

        return (
            <div>
               <ButtonAppBar/>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CollectionView);