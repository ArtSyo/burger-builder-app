import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummury';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/constants';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.8,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 5,
    readyToBuy: false,
    orderIsClicked: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get(
    //     'https://burger-builder-app-react-d6624.firebaseio.com/ingredients.json'
    //   )
    //   .then((res) => {
    //     this.setState({
    //       ingredients: res.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true,
    //     });
    //   });
  }

  updateReadyState = (ingredients) => {
    const sumAmout = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sumAmout, el) => {
        return sumAmout + el;
      }, 0);
    this.setState({ readyToBuy: sumAmout > 0 });
    // console.log(this.state.readyToBuy)
  };

  addIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    const currentCount = prevCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = currentCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updateReadyState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    if (prevCount <= 0) {
      return;
    }
    const currentCount = prevCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = currentCount;
    const priceReducing = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice - priceReducing;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updateReadyState(updatedIngredients);
  };

  orderClickHandler = () => {
    this.setState(({ orderIsClicked }) => ({
      orderIsClicked: !orderIsClicked,
    }));
  };

  orderContinueHandler = () => {
    // alert("You continue!")

    const queryParam = [];
    for (let ing in this.state.ingredients) {
      queryParam.push(
        encodeURIComponent(ing) +
          '=' +
          encodeURIComponent(this.state.ingredients[ing])
      );
    }
    queryParam.push('price=' + this.state.totalPrice);
    const queryString = queryParam.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });

    // this.props.history.push('/checkout')
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (const el in disabledInfo) {
      disabledInfo[el] = disabledInfo[el] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onIgredientAdded}
            removeIngredient={this.props.onIgredientRemoved}
            disabled={disabledInfo}
            readyToBuy={this.state.readyToBuy}
            price={this.state.totalPrice}
            ordered={this.orderClickHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          clickedContinue={this.orderContinueHandler}
          clickedCancel={this.orderClickHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIgredientAdded: (ingName) => dispatch({type: ADD_INGREDIENT, ingredientName: ingName}),
    onIgredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName}) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
