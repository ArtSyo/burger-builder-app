import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import "./BuildControls.css";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>
        Total price is: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((item) => {
        return (
          <BuildControl
            key={item.label}
            label={item.label}
            added={() => props.addIngredient(item.type)}
            removed={() => props.removeIngredient(item.type)}
            disabled={props.disabled[item.type]}
          />
        );
      })}
      <button 
      className="OrderButton" 
      disabled={!props.readyToBuy} 
    onClick={props.ordered}>{props.isAuthenticated? "ORDER" : "LOG IN TO ORDER"}</button>
    </div>
  );
};

export default BuildControls;
