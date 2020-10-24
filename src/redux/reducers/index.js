import { act } from 'react-dom/test-utils';
import {LOADING, ADD_PHOTOS} from '../actions/actionTypes';

export default function reducer(state, action) {
    const {type, ...payloads} = action;
    switch(type) {
        case LOADING: {
            return {...state, ...payloads.payload};
        }
        case ADD_PHOTOS: {
            return {...state, ...payloads.payload};
        }
        default: {
            return {...state, ...payloads.payload};
        }
    }
}
