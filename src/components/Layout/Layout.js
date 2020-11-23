import React from 'react';
import { connect } from 'react-redux';

import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          showHandle={this.sideDrawerHandler}
          open={this.state.showSideDrawer}
        />
        <main className="content">{this.props.children}</main>
      </>
    );
  }
}

export default connect((state) => ({
  isAuthenticated: state.auth.tokenId !== null,
}))(Layout);
