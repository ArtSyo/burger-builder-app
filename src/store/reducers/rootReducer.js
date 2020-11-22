import {combineReducers} from 'redux';

import order from './order';
import ingredients from './ingredients'

const rootReducer = combineReducers({
    order,
    ingredients
})

export default rootReducer;