import * as ActionTypes from './stars-action-types';

const initState = {
    count: 0,
    nextStars: 'https://www.swapi.dev/api/people',
    stars: [],
    isFetching: false
};

const starsReducer = (state = initState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_STARS:
            return {...state, isFetching: true};
        case ActionTypes.LOAD_STARS:
            return { ...state, isFetching: false, stars: [...state.stars, ...action.stars], count: action.count, nextStars: action.nextStars };
        default:
            return state;
    }
};

export default starsReducer;
