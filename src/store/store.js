import { createStore } from 'redux';
import ingredients from './reducers/ingredients';

const store = createStore(ingredients, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
