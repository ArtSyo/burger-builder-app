import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 1,
      salad: 1,
      cheese: 2,
      meat: 1,
    },
  };

  render() {
    return (
      <>
        <div>
          <Burger ingredients={this.state.ingredients}/>
        </div>
        <div>Build Components</div>
      </>
    );
  }
}

export default BurgerBuilder;
