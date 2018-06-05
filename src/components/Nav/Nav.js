// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Manager, Target, Popper } from 'react-popper';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Collapse from '@material-ui/core/Collapse';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Portal from '@material-ui/core/Portal';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { withStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';

// const Nav = () => (
// <div className="navbar">
//   <div>
//     <ul>
//       <li>
//         <Link to="/user">
//           User Home
//         </Link>
//       </li>
//       {/* <li>
//         <Link to="/info">
//           Info Page
//         </Link>
//       </li> */}
//       <li>
//         <Link to="/collection">
//           Your Collecshion
//         </Link>
//       </li>
//       <li>
//         <Link to="/favorites">
//           Your FAvvvvs
//         </Link>
//       </li>
//       <li>
//         <Link to="/genre">
//          jean val genres
//         </Link>
//       </li>
//       <li>
//         <Link to="/newGame">
//          newgame+
//         </Link>
//       </li>
//     </ul>
//   </div>
// </div>
// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2,
//   },
//   popperClose: {
//     pointerEvents: 'none',
//   },
// });

// class Nav extends React.Component {
//   state = {
//     open: false,
//   };

//   handleToggle = () => {
//     this.setState({ open: !this.state.open });
//   };

//   clickUser = () => {
//     this.props.history.push('/collection');
//     // if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
//     //   return;
//     // }
//   };

//   handleClose = event => {
//     if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
//       return;
//     }

//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//       <div className={classes.root}>
//         <Manager>
//           <Target>
//             <div
//               ref={node => {
//                 this.target1 = node;
//               }}
//             >
//               <Button
//                 aria-owns={open ? 'menu-list-grow' : null}
//                 aria-haspopup="true"
//                 onClick={this.handleToggle}
//               >
//                 HAMBURGLER
// </Button>
//             </div>
//           </Target>
//           <Popper
//             placement="bottom-start"
//             eventsEnabled={open}
//             className={classNames({ [classes.popperClose]: !open })}
//           >
//             <ClickAwayListener onClickAway={this.handleClose}>
//               <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
//                 <Paper>
//                   <MenuList role="menu">
//                     <MenuItem onClick={this.clickUser}>User Home</MenuItem>
//                     <MenuItem onClick={this.handleClose}>My account</MenuItem>
//                     <MenuItem onClick={this.handleClose}>Logout</MenuItem>
//                   </MenuList>
//                 </Paper>
//               </Grow>
//             </ClickAwayListener>
//           </Popper>
//         </Manager>
//       </div>
//     );
//   }
// }
// // export default Nav;
// Nav.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default connect()(Nav);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import MemoryRouter from 'react-router/MemoryRouter';
import Route from 'react-router/Route';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class ListItemLink1 extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          {/* <ListItemIcon>{icon}</ListItemIcon> */}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink1.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function ListItemLink2(props) {
  const { primary, to } = props;
  return (
    <li>
      <ListItem button component={Link} to={to}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink2.propTypes = {
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>

      <div className={classes.lists}>
        <List component="nav">
          <ListItemLink1 to="/user" primary="User" />
          <ListItemLink1 to="/collection" primary="Collection" />
          {/* </List>
          <List component="nav"> */}
          <ListItemLink2 to="/genre" primary="Jean val Genre" />
          <ListItemLink2 to="/newGAme" primary="NewGAme+" />
        </List>
      </div>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);