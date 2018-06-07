import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import genreSaga from './genreSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    // genreSaga(),
    // watchIncrementAsync()
  ]);
}
