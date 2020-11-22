import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import { fetchOrders } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        console.log(order.id);
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );

      });
      console.log("----end of elements");
    }
    return <div>{orders}</div>;
  }
}

export default connect(
  (state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
  }),
  { fetchOrders }
)(withErrorHandler(Orders, axios));
