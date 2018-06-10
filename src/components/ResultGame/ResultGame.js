import React, { Component } from 'react';
import GenreDropDown from '../GenreDropDown/GenreDropDown';
import Button from '@material-ui/core/Button';

class ResultGame extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="add-item-container">
                <form onSubmit={() => this.props.addNewGame(this.props.result)}>
                    <div>
                        {this.props.result.name}
                        <img src={this.props.result.image.icon_url} />
                    </div>
                    <div>
                        <div>
                            <GenreDropDown handleGenre={this.props.handleGenre} />
                        </div>
                    </div>
                    <Button variant="contained" size="large" color="primary" type="submit">
                        ADD TO YOUR COLLECTION
        </Button>
                </form>
            </div>
        );
    }
}

export default ResultGame;