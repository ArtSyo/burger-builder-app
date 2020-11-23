import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './components/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Checkout/Orders/Orders')
});
const asyncAuth = asyncComponent(()=>{
  return import('./components/Auth/Auth')
});

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route exact path="/" component={BurgerBuilder} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
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
  }
}

export default withRouter(
  connect((state) => ({ isAuthenticated: state.auth.tokenId !== null }), {
    authCheckState,
  })(App)
);
