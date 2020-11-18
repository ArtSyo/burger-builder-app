import React from "react";
import "./NavigationItems.css";
import NavItem from "../NavigationItems/NavItem/NavItem";

const NavigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavItem link="/" active>
        Burger Builder
      </NavItem>
      <NavItem link="/">Checkout</NavItem>
    </ul>
  );
};

export default NavigationItems;
