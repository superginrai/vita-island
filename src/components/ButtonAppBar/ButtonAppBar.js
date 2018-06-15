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
import './ButtonAppBar.css';
import Paper from '@material-ui/core/Paper';
import { blue100 } from 'material-ui/styles/colors';

const styles = {
    paper: {
        // paddingTop: 1,
        // paddingBottom: 1,
        // marginBottom: theme.spacing.unit * 3,
        height: 25,
        width: 50,
        // marginBottom: 20,
    },

    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',

    },
    // IconButton: {
    //     marginLeft: -12,
    //     marginRight: 20,
    // },
    DropDown: {
        //   padding: '30px 110px'
    },
    psx: {
        background: 'linear-gradient(45deg, #0054A9 30%, #078BD2 90%)',
        // borderRadius: 3,
        // border: 0,
        color: 'white',
        // height: 48,
        // padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(178, 215, 239, .30)',
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar className={classes.psx} position="fixed">
                <Toolbar>
                    <DropDown className={classes.DropDown} />
                    <Typography variant="title" color="inherit" className={classes.text}>
                        {/* VITA;island */}
                        <h3>{props.currentView}</h3>
                    </Typography>
                    <Typography variant="title" className={classes.flex}>
                        {props.addOn}
                    </Typography>
                    {/* <div className="icon-box"> */}
                    {/* <Paper className={classes.paper} elevation={2}> */}
                    <Button component="a" href="/newGame" size="small" variant="contained" color="primary" className={classes.button}>
                        {/* <IconButton component="a" href="/newGame" color={blue100}> */}
                        <Games /><FiberNew /></Button>
                    {/* </Paper> */}
                    {/* </div> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);