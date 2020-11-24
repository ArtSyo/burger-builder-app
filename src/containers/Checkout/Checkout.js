import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    const perchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {perchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCanceled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

export default connect((state) => ({
  ingredients: state.ingredients.ingredients,
  purchased: state.order.purchased,
}))(Checkout);
