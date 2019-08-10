import { all } from 'redux-saga/effects';
import starsSaga from './stars/stars-actions';

export default function* rootSaga() {
    yield all([starsSaga()]);
}