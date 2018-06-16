import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import igdb from 'igdb-api-node';

// function* searchApi(action) {
//     try {
//         const search = yield call(axios.get, `http://www.giantbomb.com/api/search/?api_key=b901898053fca3a33f549441a3c3452941eed42f&format=json&query="${action.payload}"&resources=game`);
//         console.log(search);
//         yield dispatch({
//             type: 'SEARCH_RESULTS',
//             payload: search.data.results,
//         })
//     } catch (error) { }
// }

const client = igdb('72bb7ce60b4626f158199825d65f9ffc'),
    log = response => {
        console.log(response.url, JSON.stringify(response.body, null, 2));
    };

function* searchApi(action) {
    try {
        const search = yield call(
            client.games, {
                filters: {
                    'platforms-eq': '46',
                    'genres-exists': '1',
                    'name-exists': '1',
                    'summary-exists':'1',
                },
                fields: '*', // Return all fields
                limit: 10, // Limit to 5 results
                // offset: 15, // Index offset for results
                search: action.payload
            });
        console.log(search.body);
        yield dispatch({
            type: 'SEARCH_RESULTS',
            payload: search.body,
        })
        // yield search.body.object.game.map({

        // })
    } catch (error) { }
}

function* addGame(action) {
    try {
        const gamePost = yield call(axios.post, '/api/game', action.payload);
        console.log(gamePost);

    } catch (error) { }
}

function* makeComplete(action) {
    try {
        const gameComplete = yield call(axios.put, '/api/game/complete', action.payload);
        console.log(gameComplete);
    } catch (error) { }
}

function* makeSealed(action) {
    try {
        const gameSealed = yield call(axios.put, '/api/game/sealed', action.payload);
        console.log(gameSealed);
    } catch (error) { }
}

function* searchApiSaga() {
    yield takeEvery('API_SEARCH', searchApi);
    yield takeEvery('ADD_GAME', addGame);
    yield takeEvery('MAKE_COMPLETE', makeComplete);
    yield takeEvery('MAKE_SEALED', makeSealed);
}

export default searchApiSaga;