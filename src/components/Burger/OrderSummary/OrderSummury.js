import React from "react";
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}:</span>{" "}
        {props.ingredients[ingKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order:</h3>
      <ul>{ingredientSummary}</ul>
      <p>Continue?</p>
        <Button btnType='Danger' clicked={props.clickedCancel}>CANCEL</Button>
        <Button btnType='Success'clicked={props.clickedContinue}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
