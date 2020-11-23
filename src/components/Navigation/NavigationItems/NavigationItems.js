import React from 'react';
import './NavigationItems.css';
import NavItem from '../NavigationItems/NavItem/NavItem';

const NavigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavItem link="/" exact>
        Burger Builder
      </NavItem>
      <NavItem link="/orders">Orders</NavItem>
      {!props.isAuthenticated ? (
        <NavItem link="/auth">Log In</NavItem>
      ) : (
        <NavItem link="/logout">Log Out</NavItem>
      )}
    </ul>
  );
};

export default NavigationItems;
