import React from "react";
import classes from "./NavigationItems.module.css";
import NavItem from "./NavItem/NavItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/following">Following</NavItem>
      <NavItem link="/recommended">Recommended</NavItem>
      <NavItem link="/browse">Browse</NavItem>
    </ul>
  );
};

export default navigationItems;
