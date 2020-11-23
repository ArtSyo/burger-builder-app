import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import { fetchOrders } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Orders extends Component {
  
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
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
  }
}

export default connect(
  (state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.tokenId,
    userId: state.auth.userId,
  }),
  { fetchOrders }
)(withErrorHandler(Orders, axios));
