import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './GenreDropDown.css';
import { withStyles } from '@material-ui/core/styles';
import { lightBlue100 } from 'material-ui/styles/colors';


const styles = {
  MenuItem: {
     color: lightBlue100,
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

    // handleInputChangeFor = propertyName => (event) => {
    //     console.log(this.state.genre)
    //     this.setState({
    //       [propertyName]: event.target.value,
    //     });
    //     console.log(propertyName);
    //     this.props.handleGenre (this.state.genre);
    //   }

    handleInputChangeFor = propertyName => (event) => {
        console.log(this.state.genre)
        this.setState({
            [propertyName]: event.target.value,
        });
        console.log(propertyName);
        this.props.handleGenre(event.target.value);
        // this.setState({
        //     [propertyName]: '',
        // })
    }

    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    // handleClose = () => {
    //     this.setState({ anchorEl: null });
    // };

    render() {
        // const { anchorEl } = this.state;

        return (
            <div>
                 {/* <Button
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
                    <MenuItem onClick={() => this.props.handleGenre(1)} >Action</MenuItem>
                    <MenuItem onClick={() => this.props.handleGenre(7)} >RPG</MenuItem>
                    <MenuItem onClick={() => this.props.handleGenre(9)} >Simulation</MenuItem>
                    <MenuItem onClick={() => this.props.handleGenre(12)} >Visual Novel</MenuItem>
                </Menu> */}
                <FormControl fullWidth color="secondary">
                    {/* <InputLabel htmlFor="genre">
               Genre:</InputLabel> */}
                    <Select color="secondary"
                        // id="simple-menu"
                        // anchorEl={anchorEl}
                        // open={Boolean(anchorEl)}
                        // onClose={this.handleClose}
                        value={this.state.genre}
                        onChange={this.handleInputChangeFor('genre')}
                        inputProps={{
                            name: 'genre',
                            id: 'genre',
                        }}
                    >
                        {/* <MenuItem value="">
                            <em>Genre</em>
                        </MenuItem> */}
                        <MenuItem color="secondary" value={31}>Adventure</MenuItem>
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