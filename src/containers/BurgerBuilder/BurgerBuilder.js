import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummury';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {
  addIngredient,
  removeIngredient,
  initIngredient,
  buyInit,
  setAuthRedirectPath,
} from '../../store/actions/index';

import axios from '../../axios-orders';

export const BurgerBuilder = (props) => {
  const [orderIsClicked, setOrderIsClicked] = useState(false);
  const { initIngredient } = props;
  
  useEffect(() => {
    initIngredient();
  }, [initIngredient]);

  const updateReadyState = (ingredients) => {
    const sumAmout = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sumAmout, el) => {
        return sumAmout + el;
      }, 0);
    return sumAmout > 0;
  };

  const orderClickHandler = () => {
    if (props.isAuthenticated) {
      setOrderIsClicked(!orderIsClicked);
    } else {
      props.setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const orderContinueHandler = () => {
    props.buyInit();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ingredients,
  };
  for (const el in disabledInfo) {
    disabledInfo[el] = disabledInfo[el] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          addIngredient={props.addIngredient}
          removeIngredient={props.removeIngredient}
          disabled={disabledInfo}
          readyToBuy={updateReadyState(props.ingredients)}
          price={props.totalPrice}
          ordered={orderClickHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        clickedContinue={orderContinueHandler}
        clickedCancel={orderClickHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={orderIsClicked} modalClosed={orderClickHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

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
