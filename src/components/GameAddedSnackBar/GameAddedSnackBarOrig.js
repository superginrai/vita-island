import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SnackbarContent } from '@material-ui/core';

let openSnackbarFn;

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    success: {
        backgroundColor: green[600],
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
      icon: {
        fontSize: 20,
      },
});

class GameAddedSnackbar extends React.Component {
    state = {
        open: false,
    };

    openSnackbar = () => {
        this.setState({ open: true });
        console.log('I like snacks');
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    className={classes.success}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" className={classes.message}><CheckCircleIcon className={classes.iconVariant}/> Added to Your Collection!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon className={classes.icon}/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

GameAddedSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
};

export function openSnackbar() {
    openSnackbarFn();
}

export default withStyles(styles)(GameAddedSnackbar);