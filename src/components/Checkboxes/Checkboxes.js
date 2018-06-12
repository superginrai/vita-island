import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from 'react-redux';
import { grey100 } from 'material-ui/styles/colors';


const styles = {
  root: {
    color: grey100,
    '&$checked': {
      color: grey100,
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};
const mapStateToProps = state => ({
  user: state.user,
});


class CheckboxLabels extends React.Component {
  state = {
    checkedComplete: this.props.game.complete,
    checkedSealed: this.props.game.sealed,
    checkedFavorite: this.props.game.favorite,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  completeGame = event => {
    // event.preventDefault();
    const body = {
      person_id: this.props.game.person_id,
      id: this.props.game.id,
      complete: this.state.checkedComplete,
    }
    const action = { type: 'MAKE_COMPLETE', payload: body, }
    this.props.dispatch(action);
  }

  sealedGame = event => {
    // event.preventDefault();
    const body = {
      person_id: this.props.game.person_id,
      id: this.props.game.id,
      sealed: this.state.checkedSealed,
    }
    const action = { type: 'MAKE_SEALED', payload: body, }
    this.props.dispatch(action);
  }

  componentDidUpdate() {
    this.completeGame();
    this.sealedGame();
  }

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={this.state.checkedFavorite} onChange={this.handleChange('checkedFavorite')} onClick={() => this.props.makeFavorite(this.props.game)}/>
          }

        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<DeleteForever />} checkedIcon={<DeleteForever />} onClick={() => this.props.delete(this.props.game)}
            />
          }

        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedComplete}
              onChange={this.handleChange('checkedComplete')}
              value={this.props.game.complete}
            />
          }
          label="Complete"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedSealed}
              onChange={this.handleChange('checkedSealed')}
              value={this.props.game.sealed}
              color="primary"
            />
          }
          label="Sealed"
        />
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CheckboxLabels);