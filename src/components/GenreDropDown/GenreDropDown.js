import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './GenreDropDown.css';
import { withStyles } from '@material-ui/core/styles';
import { lightBlue100 } from 'material-ui/styles/colors';


const styles = {
    MenuItem: {
        color: lightBlue100,
        text: lightBlue100,
    },
    genreList: {
        text: lightBlue100,
    }
};

class GenreDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // anchorEl: null,
            genre: '',
        };
    }

    handleInputChangeFor = propertyName => (event) => {
        console.log(this.state.genre)
        this.setState({
            [propertyName]: event.target.value,
        });
        console.log(propertyName);
        this.props.handleGenre(event.target.value);
    }

    render() {
        // const { anchorEl } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.genreList}>
                <FormControl fullWidth color="secondary">
                    <Select
                        value={this.state.genre}
                        onChange={this.handleInputChangeFor('genre')}
                        inputProps={{
                            name: 'genre',
                            id: 'genre',
                        }}
                    >
                        <MenuItem value={31}>Adventure</MenuItem>
                        <MenuItem value={33}>Arcade</MenuItem>
                        <MenuItem value={4}>Fighting</MenuItem>
                        <MenuItem value={25}>Hack 'n' Slash</MenuItem>
                        <MenuItem value={10}>Racing</MenuItem>
                        <MenuItem value={12}>RPG</MenuItem>
                        <MenuItem value={5}>Shooter</MenuItem>
                        <MenuItem value={13}>Simulator</MenuItem>
                        <MenuItem value={15}>Strategy</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(GenreDropDown);