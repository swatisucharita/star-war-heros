import { combineReducers } from 'redux';
import starReducer from './stars/stars-reducer';

const reducers = combineReducers({
    stars: starReducer
});

export default reducers;