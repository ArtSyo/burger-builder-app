import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.8,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 5,
    readyToBuy: false,
  };

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

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (const el in disabledInfo) {
      disabledInfo[el] = disabledInfo[el] <= 0;
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          readyToBuy={this.state.readyToBuy}
          price={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
