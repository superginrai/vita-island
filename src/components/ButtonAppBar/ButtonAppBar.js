import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DropDown from '../DropDown/DropDown';
import FiberNew from '@material-ui/icons/FiberNew';
import Games from '@material-ui/icons/Games';
import Search from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import './ButtonAppBar.css';

const styles = {
    paper: {
        height: 25,
        width: 50,
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
    psx: {
        background: 'linear-gradient(45deg, #0054A9 30%, #078BD2 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(178, 215, 239, .30)',
    },
};



class ButtonAppBar extends Component {
    constructor(props) {
        super(props)
    }

    // addNew = () => {
    //     this.props.history.push('newGame');
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.psx} position="fixed">
                    <Toolbar>
                        <DropDown collectionNav={this.props.collectionNav} favNav={this.props.favNav} genreNav={this.props.genreNav} logOut={this.props.logOut} className={classes.DropDown} />
                        <Typography variant="title" color="inherit" className={classes.text}>
                            <h3>{this.props.currentView}</h3>
                        </Typography>
                        <Typography variant="title" className={classes.flex}>
                            {this.props.addOn}
                        </Typography>
                        <IconButton component="a" onClick={this.props.localSearch} className={classes.button} aria-label="Search">
                            <Search />
                        </IconButton>
                        <Button component="a" onClick={this.props.addNew} size="small" variant="contained" color="primary" className={classes.button}>
                            <Games /><FiberNew /></Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(ButtonAppBar));