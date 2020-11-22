import { combineReducers } from 'redux';

import order from './order';
import ingredients from './ingredients';
import auth from './auth';

const rootReducer = combineReducers({
  order,
  ingredients,
  auth,
});

export default rootReducer;
