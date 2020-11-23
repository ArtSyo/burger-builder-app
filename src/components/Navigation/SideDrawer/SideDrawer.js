import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import BackDrop from "../../UI/BackDrop/BackDrop";

const SideDrawer = (props) => {
  let classList = ["SideDrawer", "Close"];
  if (props.open) {
    classList = ["SideDrawer", "Open"];
  }

  return (
    <>
      <BackDrop show={props.open} clicked={props.showHandle} />
      <div className={classList.join(" ")} onClick={props.showHandle}>
        <div className="Logo-m">
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
