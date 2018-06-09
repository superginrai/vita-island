import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DropDown from '../DropDown/DropDown';
import FiberNew from '@material-ui/icons/FiberNew';
import Games from '@material-ui/icons/Games';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    // IconButton: {
    //     marginLeft: -12,
    //     marginRight: 20,
    // },
    DropDown: {
        marginRight: 50,
    }
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <DropDown className={classes.DropDown}/>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {/* VITA;island */}
                        {props.currentView}
                    </Typography>
                    <Typography variant="title" className={classes.flex}>
                        {props.addOn}
                    </Typography>
                    <IconButton component="a" href="/newGame" color="inherit"><Games /><FiberNew /></IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);