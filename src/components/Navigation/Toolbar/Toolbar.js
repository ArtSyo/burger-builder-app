import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <div className="Logo-d">
        <Logo />
      </div>
      <nav className="DesktopOnly">
        <NavigationItems 
        isAuthenticated={props.isAuthenticated}/>
      </nav>
    </header>
  );
};

export default Toolbar;
