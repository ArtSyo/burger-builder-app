import { updateObject } from '../utility';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from '../constants';

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.8,
  meat: 1.2,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredientRemove = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsRemove = updateObject(
    state.ingredients,
    updatedIngredientRemove
  );
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedStateRemove);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 5,
    error: false,
    building: false,
  });
};

const fetchIngredient = (state, action) => {
  return updateObject(state, { error: true });
};

const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);

    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case SET_INGREDIENTS:
      return setIngredient(state, action);

    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredient(state, action);

    default:
      return state;
  }
};

export default ingredients;
