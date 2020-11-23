import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummury';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/constants';

import {
  addIngredient,
  removeIngredient,
  initIngredient,
  buyInit,
  setAuthRedirectPath,
} from '../../store/actions/index';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    orderIsClicked: false,
  };

  componentDidMount() {
    this.props.initIngredient();
  }

  updateReadyState = (ingredients) => {
    const sumAmout = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sumAmout, el) => {
        return sumAmout + el;
      }, 0);
    return sumAmout > 0;
    // console.log(this.state.readyToBuy)
  };

  orderClickHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState(({ orderIsClicked }) => ({
        orderIsClicked: !orderIsClicked,
      }));
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  orderContinueHandler = () => {
    this.props.buyInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (const el in disabledInfo) {
      disabledInfo[el] = disabledInfo[el] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disabledInfo}
            readyToBuy={this.updateReadyState(this.props.ingredients)}
            price={this.props.totalPrice}
            ordered={this.orderClickHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          clickedContinue={this.orderContinueHandler}
          clickedCancel={this.orderClickHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.orderIsClicked}
          modalClosed={this.orderClickHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default connect(
  (state) => ({
    ingredients: state.ingredients.ingredients,
    totalPrice: state.ingredients.totalPrice,
    error: state.ingredients.error,
    isAuthenticated: state.auth.tokenId !== null,
  }),
  {
    addIngredient,
    removeIngredient,
    initIngredient,
    buyInit,
    setAuthRedirectPath,
  }
)(withErrorHandler(BurgerBuilder, axios));
