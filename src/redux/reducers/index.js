import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import searchResults from './searchResultsReducer';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

const store = combineReducers({
  user,
  login,
  searchResults,
  // storeThumbnails,
});

export default store;
