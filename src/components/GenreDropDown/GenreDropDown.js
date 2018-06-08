import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
        this.props.handleGenre (event.target.value);
        this.setState({
            [propertyName]: '',
        })
      }

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
                <FormControl fullWidth>
             <InputLabel htmlFor="genre">
               Genre:</InputLabel>
             <Select 
               value={this.state.genre}
               onChange={this.handleInputChangeFor('genre')}
               inputProps={{
                 name: 'genre',
                 id: 'genre',
               }}
             >
               <MenuItem value="">
                 <em>Genre</em>
               </MenuItem>
               <MenuItem value={1}>Action</MenuItem>
               <MenuItem value={2}>Adventure</MenuItem>
               <MenuItem value={3}>Fighting</MenuItem>
               <MenuItem value={4}>Otome</MenuItem>
               <MenuItem value={5}>Music</MenuItem>
               <MenuItem value={6}>Racing</MenuItem>
             </Select>
           </FormControl>
         </div>
        );
    }
}

export default GenreDropDown;