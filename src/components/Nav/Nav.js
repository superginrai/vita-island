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
    // <div className="navbar">
    <div className={classes.root}>
      {/* <div> */}
      <List>
        <ListItem>
          <Link to="/user">
          <ListItemText primary="User Home" />
        </Link>
        </ListItem>
        {/* <li>
        <Link to="/info">
          Info Page
        </Link>
      </li> */}
        <ListItem>
          <Link to="/collection">
            <ListItemText primary="Your Collection" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/favorites">
            <ListItemText primary="Favorites" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/genre">
            <ListItemText primary="Genres" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/newGame">
          <ListItemText primary="NewGame+" />
        </Link>
        </ListItem>
      </List>
      {/* </div> */}
    </div>
  )
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);