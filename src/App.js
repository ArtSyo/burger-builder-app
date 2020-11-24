import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './components/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Checkout/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./components/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.authCheckState();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/orders" component={asyncOrders} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <>
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    </>
  );
};

export default withRouter(
  connect((state) => ({ isAuthenticated: state.auth.tokenId !== null }), {
    authCheckState,
  })(App)
);
