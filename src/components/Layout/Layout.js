import React from "react";

import './Layout.css';

const Layout = (props) => {

    return (
    <>
    <div> Toolbar, SideDrawer, Backdrop </div>
    <main className='content'>{props.children}</main>
  </>
    )
};

export default Layout;
