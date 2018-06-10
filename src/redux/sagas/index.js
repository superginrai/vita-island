import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import searchApiSaga from './searchApiSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    searchApiSaga(),
    // watchIncrementAsync()
  ]);
}
