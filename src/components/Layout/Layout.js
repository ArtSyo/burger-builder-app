import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        drawerToggleClicked={sideDrawerHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        showHandle={sideDrawerHandler}
        open={showSideDrawer}
      />
      <main className="content">{props.children}</main>
    </>
  );
};

export default connect((state) => ({
  isAuthenticated: state.auth.tokenId !== null,
}))(Layout);
