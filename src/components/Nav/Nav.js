import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const Nav = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button component="a" href="/user">
          <ListItemText primary="User Home" />
        </ListItem>
        <ListItem button component="a" href="/collection">
          <ListItemText primary="Your Collection" />
        </ListItem>
        <ListItem button component="a" href="/favorites">
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component="a" href="/genre">
          <ListItemText primary="Genres" />
        </ListItem>
      </List>
    </div>
  )
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);