import { createStore, compose, applyMiddleware } from 'redux';
// import ingredients from './reducers/ingredients';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
