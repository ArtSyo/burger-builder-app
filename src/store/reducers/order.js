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

const order = (state = initalState, action) => {
  switch (action.type) {
    case BUY_INIT: {
      return updateObject(state, { purchased: false });
    }
    case BUY_BURGER_START: {
      return updateObject(state, { loading: true });
    }
    case BUY_BURGER_SUCCESS: {
      const newOrder = updateObject(action.orderData, { id: action.id });
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      });
    }
    case BUY_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });

    case FETCH_ORDERS_START:
      return updateObject(state, { loading: true });

    case FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });

    default:
      return state;
  }
};

export default order;
