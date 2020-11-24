import React, { useEffect } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import { fetchOrders } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Orders = (props) => {
  const { fetchOrders, token, userId } = props;
  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => {
      return (
        <Order
          key={order.id + new Date()}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  }
  return <div>{orders}</div>;
};

export default connect(
  (state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.tokenId,
    userId: state.auth.userId,
  }),
  { fetchOrders }
)(withErrorHandler(Orders, axios));
