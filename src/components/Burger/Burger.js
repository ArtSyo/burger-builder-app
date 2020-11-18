import React from "react";

import "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(
    (ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredients key={ingKey + i} type={ingKey} />;
      });
    }
  );
  console.log(transformedIngredients);

  return (
    <div className="Burger">
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
