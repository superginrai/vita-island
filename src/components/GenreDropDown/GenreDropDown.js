import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class GenreDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
        }
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Select Genre
        </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => this.props.handleGenre(4)} >Otome</MenuItem>
                    <MenuItem onClick={() => this.props.handleGenre(7)} >RPG</MenuItem>
                    <MenuItem onClick={() => this.props.handleGenre(12)} >Visual Novel</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default GenreDropDown;