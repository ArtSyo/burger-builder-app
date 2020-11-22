import {
  BUY_BURGER_SUCCESS,
  BUY_BURGER_FAIL,
  BUY_BURGER_START,
} from '../constants';
import axios from '../../axios-orders';

export const buyBurgerSuccess = (id, orderType) => {
  return {
    type: BUY_BURGER_SUCCESS,
    orderId: id,
    orderType: orderType,
  };
};

export const buyBurgerFail = (error) => {
  return {
    type: BUY_BURGER_FAIL,
    error: error,
  };
};

export const buyBurgerStart = () => {
  return {
    type: BUY_BURGER_START,
  };
};

export const buyBurger = (orderData) => {
  return (dispatch) => {
    dispatch(buyBurgerStart());
    axios
      .post('/orders.json', orderData)
      .then((response) => {
        dispatch(buyBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(buyBurgerFail(error));
      });
  };
};
