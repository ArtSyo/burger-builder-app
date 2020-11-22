import { createStore, compose, applyMiddleware } from 'redux';
import ingredients from './reducers/ingredients';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  ingredients,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
