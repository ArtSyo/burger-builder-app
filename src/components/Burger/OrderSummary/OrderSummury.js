import React from "react";
import Button from "../../UI/Button/Button";

const listStyles = {
  listStyle: "none",
  textAlign: "center",
  padding: 0,
};

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
      <ul style={listStyles}>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue?</p>
      <Button btnType="Danger" clicked={props.clickedCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.clickedContinue}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
