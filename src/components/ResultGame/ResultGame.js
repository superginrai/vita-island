import React, { Component } from 'react';
import GenreDropDown from '../GenreDropDown/GenreDropDown';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class ResultGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image_url: '',
        }
    }

    handleInputChangeForTitle = propertyName => (event) => {
        console.log(this.state.title)
        this.setState({
            [propertyName]: event.target.value,
        });
        console.log(event.target.value);
        this.props.handleTitle(event.target.value);
    }

    // componentDidMount() {
    //   this.handleInputChangeForTitle(this.props.result.name);
    // }

    render() {
        return (
            <div className="add-item-container">
                <form onSubmit={() => this.props.addNewGame()}>
                    {/* <div>
                        <Input
                            id="title"
                            value={this.props.result.name}
                            onSubmit={this.handleInputChangeForTitle('title')}
                        />
                        <Input
                            id="image"
                            value={this.props.result.image.medium_url}
                            onChange={this.handleInputChangeFor('image_url')}
                        />
                        <img src={this.props.result.image.icon_url} />
                    </div> */}
                    <div>
                        <div>
                            <GenreDropDown handleGenre={this.props.handleGenre} />
                        </div>
                        <div>
                            <Select color="secondary"
                                value={this.state.title}
                                onChange={this.handleInputChangeForTitle('title')}
                                inputProps={{
                                    name: 'title',
                                    id: 'title',
                                }}
                            >
                                {/* <MenuItem value="">
                            <em>Genre</em>
                        </MenuItem> */}
                                <MenuItem color="secondary" value={this.props.result.name}>{this.props.result.name}</MenuItem>
                            </Select>
                        </div>
                        <Button variant="contained" size="large" color="primary" type="submit">
                            ADD TO YOUR COLLECTION
        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ResultGame;