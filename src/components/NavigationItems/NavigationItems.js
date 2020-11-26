import React from "react";
import classes from "./NavigationItems.module.css";
import NavItem from "./NavItem/NavItem";

const navigationItems = () => {
  return (
    <nav>
      <input
        type="checkbox"
        id="hamburgerToggle"
        className={classes.hamburgerToggle}
      ></input>
      <label htmlFor="hamburgerToggle" className={classes.hamburger}>
        <span className={classes.bar}></span>
      </label>
      <ul className={classes.NavigationItems}>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/following">Following</NavItem>
        <NavItem link="/recommended">Recommended</NavItem>
        <NavItem link="/browse">Browse</NavItem>
      </ul>
    </nav>
  );
};

export default navigationItems;
