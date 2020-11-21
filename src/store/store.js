import { createStore } from 'redux';
import ingredients from './reducers/ingredients';

const store = createStore(ingredients);

export default store;
