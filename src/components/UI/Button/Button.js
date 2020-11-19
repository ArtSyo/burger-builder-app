import React from "react";
import "./Button.css";

const Button = (props) => {
  const ClassList = ["Button"];
  if (props.btnType === "Success") {
    ClassList.push("Success");
  } else {
    ClassList.push("Danger");
  }

  return (
    <button disabled={props.disabled} className={ClassList.join(" ")} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
