// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
// import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
// import axios from 'axios';

// function* getGenre(action) {
//     try {
//         const genreResponse = yield call(axios.get, 'api/game/genre', { params: action.payload });
//         yield dispatch({
//             type: 'GET_GENRE',
//             payload: genreResponse.data,
//         })
//     } catch (error) { }

// }



// function* genreSaga() {
//     yield takeLatest('GET_GENRE');
// }

// export default genreSaga;