import * as ActionTypes from './stars-action-types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import starsList from './starsList';

export const fetchStars = (nextStarsApi) => {
    return {
        type: ActionTypes.FETCH_STARS,
        nextStarsApi
    }
};

function* fetchAllStars(action) {
    const starsUrl = action.nextStarsApi;
    if (!starsUrl) { return ; }
    const response = yield call(fetch,starsUrl);
    const stars = yield response.json();
    console.log(stars);

    yield put({
        type: ActionTypes.LOAD_STARS,
        stars: stars.results,
        count: stars.count,
        nextStars: stars.next
    });
}

function* starsSaga() {
    yield takeLatest(ActionTypes.FETCH_STARS, fetchAllStars);
}

export default starsSaga;