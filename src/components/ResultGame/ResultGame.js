import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForever from '@material-ui/icons/DeleteForever';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AddCircle from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import igdb from 'igdb-api-node';
import Checkboxes from '../Checkboxes/Checkboxes';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 530,
        //paddingTop: '90%'//'56.25%', // 16:9
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const mapStateToProps = state => ({

});

const client = igdb('72bb7ce60b4626f158199825d65f9ffc');
// log = response => {
//     console.log(response.url, JSON.stringify(response.body, null, 2));
// };


class GameCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            game: {
                title: this.props.result.name,
                image_url: 'images/vitaLove.jpg',
                genre_id: this.props.result.genres[0],
                description: this.props.result.summary,
                complete: false,
                sealed: false,
            }
        }
    }

    componentDidMount() {
        this.getCovers(this.props.result.cover);
    }

    getCovers = (thumbnail) => {
        if (thumbnail === undefined) {
            console.log('cover art is default');
        } else {
            const cover = client.image(
                {
                    cloudinary_id: thumbnail.cloudinary_id,
                },
                'cover_big', 'jpg');
            this.setState({
                game: {
                    ...this.state.game,
                    image_url: cover,
                }
            })
        }
    }

    // const cover = client.image(
    //     {
    //         cloudinary_id: props.result.cover.cloudinary_id,
    //     }, 
    // 'cover_big', 'jpg');

    // || null;

    // const game = {
    //     title: props.result.name,
    //     image_url: cover,
    //     genre_id: props.result.genres[0],
    //     description: props.result.summary,
    //     complete: false,
    //     sealed: false,
    // }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={this.state.game.image_url}
                        title={this.state.game.summary}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.game.title}
                        </Typography>
                        <CardActions>
                            <Button onClick={this.props.addNewGame(this.state.game)} variant="fab" color="primary" className={classes.button}>
                                <AddIcon />
                            </Button>
                            Add this game to your collection
                        {/* <Checkboxes game={props.result}/> */}
                        </CardActions>
                    </CardContent>
                </Card>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

GameCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GameCard));