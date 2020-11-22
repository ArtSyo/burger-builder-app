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
      return {
        ...state,
        purchased: false,
      };
    }
    case BUY_BURGER_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case BUY_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.id,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case BUY_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default order;
