import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';

// function* getGenre(action) {
//   try {
//     const genreResponse = yield call(axios.get, 'api/game/genre', action.payload);
//     console.log('gettting genress');
//     yield dispatch({
//       type: 'GET_GENRE',
//       payload: genreResponse.data,
//     })
//   } catch (error) { }
// }

const store = combineReducers({
  user,
  login,
  // getGenre,
});

export default store;
