import {
  BUY_BURGER_SUCCESS,
  BUY_BURGER_FAIL,
  BUY_BURGER_START,
  BUY_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
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

export const buyBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(buyBurgerStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(buyBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(buyBurgerFail(error));
      });
  };
};

export const buyInit = () => {
  return {
    type: BUY_INIT,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
    axios
      .get('/orders.json' + queryParams)
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            id: key,
            ...res.data[key],
          });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
