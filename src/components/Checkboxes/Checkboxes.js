import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect } from 'react-redux';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
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
    checkedComplete: false,
    checkedB: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    // this.completeGame();
  };

  completeGame = event => {
    // event.preventDefault();
    // console.log('game:', game);
    const body = {
      person_id: this.props.game.person_id,
      id: this.props.game.id,
      complete: this.state.checkedComplete,
    }
    const action = { type: 'MAKE_COMPLETE', payload: body, }
    this.props.dispatch(action);
  }

  componentDidUpdate() {
    this.completeGame();
}

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedComplete}
              onChange={this.handleChange('checkedComplete')}
              value={this.props.game.complete}
              // onClick={this.completeGame}
            />
          }
          label="Complete"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
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