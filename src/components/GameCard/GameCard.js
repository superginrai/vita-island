import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Favorite_Border from '@material-ui/icons/FavoriteBorder';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: 430,
    //paddingTop: '90%'//'56.25%', // 16:9
  },
};

function GameCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="images/Banana.jpg"
          title={props.complete}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.title}
          </Typography>
          <CardActions>
            <IconButton onClick={() => props.makeFavorite(props.game)} size="small" color="secondary">
              <Favorite_Border />
            </IconButton>
            <IconButton onClick={() => props.delete(props.game)} size="small">
              <DeleteForever />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

GameCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameCard);