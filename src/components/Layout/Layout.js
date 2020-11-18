import React from "react";

import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerHandler = () => {
    this.setState(({ showSideDrawer }) => ({
      showSideDrawer: !showSideDrawer,
    }));
  };

  render() {
    return (
      <>
        <Toolbar drawerToggleClicked={this.sideDrawerHandler} />
        <SideDrawer
          showHandle={this.sideDrawerHandler}
          open={this.state.showSideDrawer}
        />
        <main className="content">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
