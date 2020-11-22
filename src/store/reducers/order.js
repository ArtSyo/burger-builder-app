import { updateObject } from '../utility';

import {
  BUY_BURGER_SUCCESS,
  BUY_BURGER_FAIL,
  BUY_BURGER_START,
  BUY_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../constants';

const initalState = {
  orders: [],
  loading: false,
  purchased: false,
};

const buyInit = (state, action) => {
  return updateObject(state, { purchased: false });
}
const buyBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
}
const buyBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.id });
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      });
}
const buyBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
}
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
}
const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
}

const order = (state = initalState, action) => {
  switch (action.type) {
    case BUY_INIT: return buyInit(state,action);
    case BUY_BURGER_START:  return buyBurgerStart(state, action);
    case BUY_BURGER_SUCCESS: return buyBurgerSuccess (state, action);
    case BUY_BURGER_FAIL: return buyBurgerFail(state, action);
    case FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case FETCH_ORDERS_FAIL:return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default order;
