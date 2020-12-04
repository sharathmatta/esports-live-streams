import React, { useState } from "react";
import classes from "./NavigationItems.module.css";
import NavItem from "./NavItem/NavItem";

const NavigationItems = (props) => {
  const [showNav, setShowNav] = useState(false);
  const navClickHandler = () => {
    setShowNav(!showNav);
  };
  return (
    <nav>
      <input
        type="checkbox"
        id="hamburgerToggle"
        className={classes.hamburgerToggle}
        checked={showNav}
        onChange={navClickHandler}
      ></input>
      <label htmlFor="hamburgerToggle" className={classes.hamburger}>
        <span className={classes.bar}></span>
      </label>
      <ul className={classes.NavigationItems}>
        <NavItem link="/home" NavItemClicked={navClickHandler}>
          Home
        </NavItem>
        <NavItem link="/add" NavItemClicked={navClickHandler}>
          Following
        </NavItem>
        <NavItem link="/recommended" NavItemClicked={navClickHandler}>
          Recommended
        </NavItem>
        <NavItem link="/browse" NavItemClicked={navClickHandler}>
          Browse
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavigationItems;
