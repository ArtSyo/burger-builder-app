import axios from '../../axios-orders';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from '../constants';

export const addIngredient = (name) => {
  return {
    type: ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get(
        'https://burger-builder-app-react-d6624.firebaseio.com/ingredients.json'
      )
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientFailed());
      });
  };
};
