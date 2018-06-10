import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

function* searchApi(action) {
    try {
        const search = yield call(axios.get, `http://www.giantbomb.com/api/search/?api_key=b901898053fca3a33f549441a3c3452941eed42f&format=json&query="${action.payload}"&resources=game`);
        console.log(search);
        yield dispatch({
            type: 'SEARCH_RESULTS',
            payload: search.data.results,
        })
    } catch (error) { }
}

function* searchApiSaga() {
    yield takeEvery('API_SEARCH', searchApi);
}

export default searchApiSaga;