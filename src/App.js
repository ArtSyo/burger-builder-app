import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

import Checkout from './containers/Checkout/Checkout';

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    return (
      <>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route exact path="/" component={BurgerBuilder} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </Layout>
        </div>
      </>
    );
  }
}

export default withRouter(connect(null, { authCheckState })(App));
