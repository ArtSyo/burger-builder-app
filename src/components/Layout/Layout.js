import React from "react";

import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) => {

    return (
    <>
    <Toolbar />
    <main className='content'>{props.children}</main>
  </>
    )
};

export default Layout;
